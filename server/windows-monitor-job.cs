using System;
using System.ComponentModel;
using System.Runtime.InteropServices;
public static class DataMonitorJob {
  private static IntPtr retained;
  [StructLayout(LayoutKind.Sequential)] struct Basic {public long processTime,jobTime;public uint flags;public UIntPtr min,max;public uint active;public UIntPtr affinity;public uint priority,scheduling;}
  [StructLayout(LayoutKind.Sequential)] struct Io {public ulong readOps,writeOps,otherOps,readBytes,writeBytes,otherBytes;}
  [StructLayout(LayoutKind.Sequential)] struct Extended {public Basic basic;public Io io;public UIntPtr processMemory,jobMemory,peakProcess,peakJob;}
  [DllImport("kernel32.dll",CharSet=CharSet.Unicode,SetLastError=true)] static extern IntPtr CreateJobObjectW(IntPtr attributes,string name);
  [DllImport("kernel32.dll",SetLastError=true)] static extern bool SetInformationJobObject(IntPtr job,int kind,ref Extended info,uint bytes);
  [DllImport("kernel32.dll",SetLastError=true)] static extern bool AssignProcessToJobObject(IntPtr job,IntPtr process);
  [DllImport("kernel32.dll")] static extern IntPtr GetCurrentProcess();
  [DllImport("kernel32.dll")] static extern bool CloseHandle(IntPtr handle);
  public static string QuoteArgument(string value) {
    if(value==null||value.IndexOf('\0')>=0)throw new ArgumentException("Literal argument required.");
    var text=new System.Text.StringBuilder("\"");int slashes=0;
    foreach(char c in value){
      if(c=='\\'){slashes++;continue;}
      if(c=='\"'){text.Append('\\',slashes*2+1);text.Append(c);slashes=0;continue;}
      text.Append('\\',slashes);slashes=0;text.Append(c);
    }
    text.Append('\\',slashes*2);text.Append('\"');return text.ToString();
  }
  public static int Run(string executable,string[] args) {
    if(retained==IntPtr.Zero)throw new InvalidOperationException("Retain the lifetime Job before starting a watcher.");
    if(!System.IO.Path.IsPathRooted(executable)||!System.IO.File.Exists(executable))throw new ArgumentException("An existing absolute executable is required.");
    var start=new System.Diagnostics.ProcessStartInfo();start.FileName=executable;
    var arguments=new string[args.Length];for(int i=0;i<args.Length;i++)arguments[i]=QuoteArgument(args[i]);
    start.Arguments=string.Join(" ",arguments);start.UseShellExecute=false;start.CreateNoWindow=true;
    // Direct native process creation has no wildcard or shell command lookup.
    // The child inherits this process's retained Job; no extra shell is started.
    start.RedirectStandardInput=true;start.RedirectStandardOutput=true;start.RedirectStandardError=true;
    using(var child=System.Diagnostics.Process.Start(start)){
      if(child==null)throw new InvalidOperationException("The watcher did not start.");
      IntPtr identity=child.Handle;child.StandardInput.Close();
      var output=child.StandardOutput.BaseStream.CopyToAsync(Console.OpenStandardOutput());
      var error=child.StandardError.BaseStream.CopyToAsync(Console.OpenStandardError());
      child.WaitForExit();System.Threading.Tasks.Task.WaitAll(new[]{output,error});return child.ExitCode;
    }
  }
  public static IntPtr Retain() {
    if(retained!=IntPtr.Zero)return retained;
    IntPtr job=CreateJobObjectW(IntPtr.Zero,null);if(job==IntPtr.Zero)throw new Win32Exception(Marshal.GetLastWin32Error());
    var limits=new Extended();limits.basic.flags=0x2000;
    if(!SetInformationJobObject(job,9,ref limits,(uint)Marshal.SizeOf(typeof(Extended)))||!AssignProcessToJobObject(job,GetCurrentProcess())){int error=Marshal.GetLastWin32Error();CloseHandle(job);throw new Win32Exception(error);}
    // Never Dispose this while running: the current process belongs to the job.
    // OS process exit closes the only non-inheritable handle and all descendants.
    retained=job;return job;
  }
}

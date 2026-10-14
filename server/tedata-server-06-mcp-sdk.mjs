// ToolsEnabled Data server, part 6 of 15: the MCP SDK (lines 23877-28324 of the bundle).
// The server is one esbuild bundle stored as 15 ES modules of under 256 KiB each, cut between top-level statements
// so that every file can be read in full (README.md, "Verifying a release"). The import lines first load the previous
// part, so the parts run in the bundle's order, then name what this part uses from other parts; the export line names
// what other parts use from it. Without the lines outside "Bundle text", the parts join to the bundle byte for byte.
import "./tedata-server-05-zod.mjs";
import { __toESM } from "./tedata-server-01-ajv.mjs";
import { ZodFirstPartyTypeKind, require_ajv, require_dist } from "./tedata-server-02-zod.mjs";
import { ZodOptional2, _enum2, _null3, array, boolean2, custom, discriminatedUnion, getLiteralValue, getObjectShape,
  getParseErrorMessage, getSchemaDescription, intersection, isSchemaOptional, isZ4Schema, iso_exports2, literal,
  looseObject, normalizeObjectSchema, number2, object2, objectFromShape, optional, preprocess, record, safeParse2,
  safeParseAsync2, string2, toJSONSchema, union, unknown } from "./tedata-server-05-zod.mjs";
// Bundle text, part 6 of 15

// node_modules/@modelcontextprotocol/sdk/dist/esm/types.js
var LATEST_PROTOCOL_VERSION = "2025-11-25";
var SUPPORTED_PROTOCOL_VERSIONS = [LATEST_PROTOCOL_VERSION, "2025-06-18", "2025-03-26", "2024-11-05", "2024-10-07"], RELATED_TASK_META_KEY = "io.modelcontextprotocol/related-task", JSONRPC_VERSION = "2.0", AssertObjectSchema = custom((v2) => v2 !== null && (typeof v2 == "object" || typeof v2 == "function")), ProgressTokenSchema = union([string2(), number2().int()]), CursorSchema = string2(), TaskCreationParamsSchema = looseObject({
  /**
   * Requested duration in milliseconds to retain task from creation.
   */
  ttl: number2().optional(),
  /**
   * Time in milliseconds to wait between task status requests.
   */
  pollInterval: number2().optional()
}), TaskMetadataSchema = object2({
  ttl: number2().optional()
}), RelatedTaskMetadataSchema = object2({
  taskId: string2()
}), RequestMetaSchema = looseObject({
  /**
   * If specified, the caller is requesting out-of-band progress notifications for this request (as represented by notifications/progress). The value of this parameter is an opaque token that will be attached to any subsequent notifications. The receiver is not obligated to provide these notifications.
   */
  progressToken: ProgressTokenSchema.optional(),
  /**
   * If specified, this request is related to the provided task.
   */
  [RELATED_TASK_META_KEY]: RelatedTaskMetadataSchema.optional()
}), BaseRequestParamsSchema = object2({
  /**
   * See [General fields: `_meta`](/specification/draft/basic/index#meta) for notes on `_meta` usage.
   */
  _meta: RequestMetaSchema.optional()
}), TaskAugmentedRequestParamsSchema = BaseRequestParamsSchema.extend({
  /**
   * If specified, the caller is requesting task-augmented execution for this request.
   * The request will return a CreateTaskResult immediately, and the actual result can be
   * retrieved later via tasks/result.
   *
   * Task augmentation is subject to capability negotiation - receivers MUST declare support
   * for task augmentation of specific request types in their capabilities.
   */
  task: TaskMetadataSchema.optional()
}), isTaskAugmentedRequestParams = (value3) => TaskAugmentedRequestParamsSchema.safeParse(value3).success, RequestSchema = object2({
  method: string2(),
  params: BaseRequestParamsSchema.loose().optional()
}), NotificationsParamsSchema = object2({
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: RequestMetaSchema.optional()
}), NotificationSchema = object2({
  method: string2(),
  params: NotificationsParamsSchema.loose().optional()
}), ResultSchema = looseObject({
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: RequestMetaSchema.optional()
}), RequestIdSchema = union([string2(), number2().int()]), JSONRPCRequestSchema = object2({
  jsonrpc: literal(JSONRPC_VERSION),
  id: RequestIdSchema,
  ...RequestSchema.shape
}).strict(), isJSONRPCRequest = (value3) => JSONRPCRequestSchema.safeParse(value3).success, JSONRPCNotificationSchema = object2({
  jsonrpc: literal(JSONRPC_VERSION),
  ...NotificationSchema.shape
}).strict(), isJSONRPCNotification = (value3) => JSONRPCNotificationSchema.safeParse(value3).success, JSONRPCResultResponseSchema = object2({
  jsonrpc: literal(JSONRPC_VERSION),
  id: RequestIdSchema,
  result: ResultSchema
}).strict(), isJSONRPCResultResponse = (value3) => JSONRPCResultResponseSchema.safeParse(value3).success;
var ErrorCode;
(function(ErrorCode2) {
  ErrorCode2[ErrorCode2.ConnectionClosed = -32e3] = "ConnectionClosed", ErrorCode2[ErrorCode2.RequestTimeout = -32001] = "RequestTimeout", ErrorCode2[ErrorCode2.ParseError = -32700] = "ParseError", ErrorCode2[ErrorCode2.InvalidRequest = -32600] = "InvalidRequest", ErrorCode2[ErrorCode2.MethodNotFound = -32601] = "MethodNotFound", ErrorCode2[ErrorCode2.InvalidParams = -32602] = "InvalidParams", ErrorCode2[ErrorCode2.InternalError = -32603] = "InternalError", ErrorCode2[ErrorCode2.UrlElicitationRequired = -32042] = "UrlElicitationRequired";
})(ErrorCode || (ErrorCode = {}));
var JSONRPCErrorResponseSchema = object2({
  jsonrpc: literal(JSONRPC_VERSION),
  id: RequestIdSchema.optional(),
  error: object2({
    /**
     * The error type that occurred.
     */
    code: number2().int(),
    /**
     * A short description of the error. The message SHOULD be limited to a concise single sentence.
     */
    message: string2(),
    /**
     * Additional information about the error. The value of this member is defined by the sender (e.g. detailed error information, nested errors etc.).
     */
    data: unknown().optional()
  })
}).strict();
var isJSONRPCErrorResponse = (value3) => JSONRPCErrorResponseSchema.safeParse(value3).success;
var JSONRPCMessageSchema = union([
  JSONRPCRequestSchema,
  JSONRPCNotificationSchema,
  JSONRPCResultResponseSchema,
  JSONRPCErrorResponseSchema
]), JSONRPCResponseSchema = union([JSONRPCResultResponseSchema, JSONRPCErrorResponseSchema]), EmptyResultSchema = ResultSchema.strict(), CancelledNotificationParamsSchema = NotificationsParamsSchema.extend({
  /**
   * The ID of the request to cancel.
   *
   * This MUST correspond to the ID of a request previously issued in the same direction.
   */
  requestId: RequestIdSchema.optional(),
  /**
   * An optional string describing the reason for the cancellation. This MAY be logged or presented to the user.
   */
  reason: string2().optional()
}), CancelledNotificationSchema = NotificationSchema.extend({
  method: literal("notifications/cancelled"),
  params: CancelledNotificationParamsSchema
}), IconSchema = object2({
  /**
   * URL or data URI for the icon.
   */
  src: string2(),
  /**
   * Optional MIME type for the icon.
   */
  mimeType: string2().optional(),
  /**
   * Optional array of strings that specify sizes at which the icon can be used.
   * Each string should be in WxH format (e.g., `"48x48"`, `"96x96"`) or `"any"` for scalable formats like SVG.
   *
   * If not provided, the client should assume that the icon can be used at any size.
   */
  sizes: array(string2()).optional(),
  /**
   * Optional specifier for the theme this icon is designed for. `light` indicates
   * the icon is designed to be used with a light background, and `dark` indicates
   * the icon is designed to be used with a dark background.
   *
   * If not provided, the client should assume the icon can be used with any theme.
   */
  theme: _enum2(["light", "dark"]).optional()
}), IconsSchema = object2({
  /**
   * Optional set of sized icons that the client can display in a user interface.
   *
   * Clients that support rendering icons MUST support at least the following MIME types:
   * - `image/png` - PNG images (safe, universal compatibility)
   * - `image/jpeg` (and `image/jpg`) - JPEG images (safe, universal compatibility)
   *
   * Clients that support rendering icons SHOULD also support:
   * - `image/svg+xml` - SVG images (scalable but requires security precautions)
   * - `image/webp` - WebP images (modern, efficient format)
   */
  icons: array(IconSchema).optional()
}), BaseMetadataSchema = object2({
  /** Intended for programmatic or logical use, but used as a display name in past specs or fallback */
  name: string2(),
  /**
   * Intended for UI and end-user contexts — optimized to be human-readable and easily understood,
   * even by those unfamiliar with domain-specific terminology.
   *
   * If not provided, the name should be used for display (except for Tool,
   * where `annotations.title` should be given precedence over using `name`,
   * if present).
   */
  title: string2().optional()
}), ImplementationSchema = BaseMetadataSchema.extend({
  ...BaseMetadataSchema.shape,
  ...IconsSchema.shape,
  version: string2(),
  /**
   * An optional URL of the website for this implementation.
   */
  websiteUrl: string2().optional(),
  /**
   * An optional human-readable description of what this implementation does.
   *
   * This can be used by clients or servers to provide context about their purpose
   * and capabilities. For example, a server might describe the types of resources
   * or tools it provides, while a client might describe its intended use case.
   */
  description: string2().optional()
}), FormElicitationCapabilitySchema = intersection(object2({
  applyDefaults: boolean2().optional()
}), record(string2(), unknown())), ElicitationCapabilitySchema = preprocess((value3) => value3 && typeof value3 == "object" && !Array.isArray(value3) && Object.keys(value3).length === 0 ? { form: {} } : value3, intersection(object2({
  form: FormElicitationCapabilitySchema.optional(),
  url: AssertObjectSchema.optional()
}), record(string2(), unknown()).optional())), ClientTasksCapabilitySchema = looseObject({
  /**
   * Present if the client supports listing tasks.
   */
  list: AssertObjectSchema.optional(),
  /**
   * Present if the client supports cancelling tasks.
   */
  cancel: AssertObjectSchema.optional(),
  /**
   * Capabilities for task creation on specific request types.
   */
  requests: looseObject({
    /**
     * Task support for sampling requests.
     */
    sampling: looseObject({
      createMessage: AssertObjectSchema.optional()
    }).optional(),
    /**
     * Task support for elicitation requests.
     */
    elicitation: looseObject({
      create: AssertObjectSchema.optional()
    }).optional()
  }).optional()
}), ServerTasksCapabilitySchema = looseObject({
  /**
   * Present if the server supports listing tasks.
   */
  list: AssertObjectSchema.optional(),
  /**
   * Present if the server supports cancelling tasks.
   */
  cancel: AssertObjectSchema.optional(),
  /**
   * Capabilities for task creation on specific request types.
   */
  requests: looseObject({
    /**
     * Task support for tool requests.
     */
    tools: looseObject({
      call: AssertObjectSchema.optional()
    }).optional()
  }).optional()
}), ClientCapabilitiesSchema = object2({
  /**
   * Experimental, non-standard capabilities that the client supports.
   */
  experimental: record(string2(), AssertObjectSchema).optional(),
  /**
   * Present if the client supports sampling from an LLM.
   */
  sampling: object2({
    /**
     * Present if the client supports context inclusion via includeContext parameter.
     * If not declared, servers SHOULD only use `includeContext: "none"` (or omit it).
     */
    context: AssertObjectSchema.optional(),
    /**
     * Present if the client supports tool use via tools and toolChoice parameters.
     */
    tools: AssertObjectSchema.optional()
  }).optional(),
  /**
   * Present if the client supports eliciting user input.
   */
  elicitation: ElicitationCapabilitySchema.optional(),
  /**
   * Present if the client supports listing roots.
   */
  roots: object2({
    /**
     * Whether the client supports issuing notifications for changes to the roots list.
     */
    listChanged: boolean2().optional()
  }).optional(),
  /**
   * Present if the client supports task creation.
   */
  tasks: ClientTasksCapabilitySchema.optional(),
  /**
   * Extensions that the client supports. Keys are extension identifiers (vendor-prefix/extension-name).
   */
  extensions: record(string2(), AssertObjectSchema).optional()
}), InitializeRequestParamsSchema = BaseRequestParamsSchema.extend({
  /**
   * The latest version of the Model Context Protocol that the client supports. The client MAY decide to support older versions as well.
   */
  protocolVersion: string2(),
  capabilities: ClientCapabilitiesSchema,
  clientInfo: ImplementationSchema
}), InitializeRequestSchema = RequestSchema.extend({
  method: literal("initialize"),
  params: InitializeRequestParamsSchema
});
var ServerCapabilitiesSchema = object2({
  /**
   * Experimental, non-standard capabilities that the server supports.
   */
  experimental: record(string2(), AssertObjectSchema).optional(),
  /**
   * Present if the server supports sending log messages to the client.
   */
  logging: AssertObjectSchema.optional(),
  /**
   * Present if the server supports sending completions to the client.
   */
  completions: AssertObjectSchema.optional(),
  /**
   * Present if the server offers any prompt templates.
   */
  prompts: object2({
    /**
     * Whether this server supports issuing notifications for changes to the prompt list.
     */
    listChanged: boolean2().optional()
  }).optional(),
  /**
   * Present if the server offers any resources to read.
   */
  resources: object2({
    /**
     * Whether this server supports clients subscribing to resource updates.
     */
    subscribe: boolean2().optional(),
    /**
     * Whether this server supports issuing notifications for changes to the resource list.
     */
    listChanged: boolean2().optional()
  }).optional(),
  /**
   * Present if the server offers any tools to call.
   */
  tools: object2({
    /**
     * Whether this server supports issuing notifications for changes to the tool list.
     */
    listChanged: boolean2().optional()
  }).optional(),
  /**
   * Present if the server supports task creation.
   */
  tasks: ServerTasksCapabilitySchema.optional(),
  /**
   * Extensions that the server supports. Keys are extension identifiers (vendor-prefix/extension-name).
   */
  extensions: record(string2(), AssertObjectSchema).optional()
}), InitializeResultSchema = ResultSchema.extend({
  /**
   * The version of the Model Context Protocol that the server wants to use. This may not match the version that the client requested. If the client cannot support this version, it MUST disconnect.
   */
  protocolVersion: string2(),
  capabilities: ServerCapabilitiesSchema,
  serverInfo: ImplementationSchema,
  /**
   * Instructions describing how to use the server and its features.
   *
   * This can be used by clients to improve the LLM's understanding of available tools, resources, etc. It can be thought of like a "hint" to the model. For example, this information MAY be added to the system prompt.
   */
  instructions: string2().optional()
}), InitializedNotificationSchema = NotificationSchema.extend({
  method: literal("notifications/initialized"),
  params: NotificationsParamsSchema.optional()
});
var PingRequestSchema = RequestSchema.extend({
  method: literal("ping"),
  params: BaseRequestParamsSchema.optional()
}), ProgressSchema = object2({
  /**
   * The progress thus far. This should increase every time progress is made, even if the total is unknown.
   */
  progress: number2(),
  /**
   * Total number of items to process (or total progress required), if known.
   */
  total: optional(number2()),
  /**
   * An optional message describing the current progress.
   */
  message: optional(string2())
}), ProgressNotificationParamsSchema = object2({
  ...NotificationsParamsSchema.shape,
  ...ProgressSchema.shape,
  /**
   * The progress token which was given in the initial request, used to associate this notification with the request that is proceeding.
   */
  progressToken: ProgressTokenSchema
}), ProgressNotificationSchema = NotificationSchema.extend({
  method: literal("notifications/progress"),
  params: ProgressNotificationParamsSchema
}), PaginatedRequestParamsSchema = BaseRequestParamsSchema.extend({
  /**
   * An opaque token representing the current pagination position.
   * If provided, the server should return results starting after this cursor.
   */
  cursor: CursorSchema.optional()
}), PaginatedRequestSchema = RequestSchema.extend({
  params: PaginatedRequestParamsSchema.optional()
}), PaginatedResultSchema = ResultSchema.extend({
  /**
   * An opaque token representing the pagination position after the last returned result.
   * If present, there may be more results available.
   */
  nextCursor: CursorSchema.optional()
}), TaskStatusSchema = _enum2(["working", "input_required", "completed", "failed", "cancelled"]), TaskSchema = object2({
  taskId: string2(),
  status: TaskStatusSchema,
  /**
   * Time in milliseconds to keep task results available after completion.
   * If null, the task has unlimited lifetime until manually cleaned up.
   */
  ttl: union([number2(), _null3()]),
  /**
   * ISO 8601 timestamp when the task was created.
   */
  createdAt: string2(),
  /**
   * ISO 8601 timestamp when the task was last updated.
   */
  lastUpdatedAt: string2(),
  pollInterval: optional(number2()),
  /**
   * Optional diagnostic message for failed tasks or other status information.
   */
  statusMessage: optional(string2())
}), CreateTaskResultSchema = ResultSchema.extend({
  task: TaskSchema
}), TaskStatusNotificationParamsSchema = NotificationsParamsSchema.merge(TaskSchema), TaskStatusNotificationSchema = NotificationSchema.extend({
  method: literal("notifications/tasks/status"),
  params: TaskStatusNotificationParamsSchema
}), GetTaskRequestSchema = RequestSchema.extend({
  method: literal("tasks/get"),
  params: BaseRequestParamsSchema.extend({
    taskId: string2()
  })
}), GetTaskResultSchema = ResultSchema.merge(TaskSchema), GetTaskPayloadRequestSchema = RequestSchema.extend({
  method: literal("tasks/result"),
  params: BaseRequestParamsSchema.extend({
    taskId: string2()
  })
}), GetTaskPayloadResultSchema = ResultSchema.loose(), ListTasksRequestSchema = PaginatedRequestSchema.extend({
  method: literal("tasks/list")
}), ListTasksResultSchema = PaginatedResultSchema.extend({
  tasks: array(TaskSchema)
}), CancelTaskRequestSchema = RequestSchema.extend({
  method: literal("tasks/cancel"),
  params: BaseRequestParamsSchema.extend({
    taskId: string2()
  })
}), CancelTaskResultSchema = ResultSchema.merge(TaskSchema), ResourceContentsSchema = object2({
  /**
   * The URI of this resource.
   */
  uri: string2(),
  /**
   * The MIME type of this resource, if known.
   */
  mimeType: optional(string2()),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: record(string2(), unknown()).optional()
}), TextResourceContentsSchema = ResourceContentsSchema.extend({
  /**
   * The text of the item. This must only be set if the item can actually be represented as text (not binary data).
   */
  text: string2()
}), Base64Schema = string2().refine((val) => {
  try {
    return atob(val), !0;
  } catch {
    return !1;
  }
}, { message: "Invalid Base64 string" }), BlobResourceContentsSchema = ResourceContentsSchema.extend({
  /**
   * A base64-encoded string representing the binary data of the item.
   */
  blob: Base64Schema
}), RoleSchema = _enum2(["user", "assistant"]), AnnotationsSchema = object2({
  /**
   * Intended audience(s) for the resource.
   */
  audience: array(RoleSchema).optional(),
  /**
   * Importance hint for the resource, from 0 (least) to 1 (most).
   */
  priority: number2().min(0).max(1).optional(),
  /**
   * ISO 8601 timestamp for the most recent modification.
   */
  lastModified: iso_exports2.datetime({ offset: !0 }).optional()
}), ResourceSchema = object2({
  ...BaseMetadataSchema.shape,
  ...IconsSchema.shape,
  /**
   * The URI of this resource.
   */
  uri: string2(),
  /**
   * A description of what this resource represents.
   *
   * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
   */
  description: optional(string2()),
  /**
   * The MIME type of this resource, if known.
   */
  mimeType: optional(string2()),
  /**
   * The size of the raw resource content, in bytes (i.e., before base64 encoding or any tokenization), if known.
   *
   * This can be used by Hosts to display file sizes and estimate context window usage.
   */
  size: optional(number2()),
  /**
   * Optional annotations for the client.
   */
  annotations: AnnotationsSchema.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: optional(looseObject({}))
}), ResourceTemplateSchema = object2({
  ...BaseMetadataSchema.shape,
  ...IconsSchema.shape,
  /**
   * A URI template (according to RFC 6570) that can be used to construct resource URIs.
   */
  uriTemplate: string2(),
  /**
   * A description of what this template is for.
   *
   * This can be used by clients to improve the LLM's understanding of available resources. It can be thought of like a "hint" to the model.
   */
  description: optional(string2()),
  /**
   * The MIME type for all resources that match this template. This should only be included if all resources matching this template have the same type.
   */
  mimeType: optional(string2()),
  /**
   * Optional annotations for the client.
   */
  annotations: AnnotationsSchema.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: optional(looseObject({}))
}), ListResourcesRequestSchema = PaginatedRequestSchema.extend({
  method: literal("resources/list")
}), ListResourcesResultSchema = PaginatedResultSchema.extend({
  resources: array(ResourceSchema)
}), ListResourceTemplatesRequestSchema = PaginatedRequestSchema.extend({
  method: literal("resources/templates/list")
}), ListResourceTemplatesResultSchema = PaginatedResultSchema.extend({
  resourceTemplates: array(ResourceTemplateSchema)
}), ResourceRequestParamsSchema = BaseRequestParamsSchema.extend({
  /**
   * The URI of the resource to read. The URI can use any protocol; it is up to the server how to interpret it.
   *
   * @format uri
   */
  uri: string2()
}), ReadResourceRequestParamsSchema = ResourceRequestParamsSchema, ReadResourceRequestSchema = RequestSchema.extend({
  method: literal("resources/read"),
  params: ReadResourceRequestParamsSchema
}), ReadResourceResultSchema = ResultSchema.extend({
  contents: array(union([TextResourceContentsSchema, BlobResourceContentsSchema]))
}), ResourceListChangedNotificationSchema = NotificationSchema.extend({
  method: literal("notifications/resources/list_changed"),
  params: NotificationsParamsSchema.optional()
}), SubscribeRequestParamsSchema = ResourceRequestParamsSchema, SubscribeRequestSchema = RequestSchema.extend({
  method: literal("resources/subscribe"),
  params: SubscribeRequestParamsSchema
}), UnsubscribeRequestParamsSchema = ResourceRequestParamsSchema, UnsubscribeRequestSchema = RequestSchema.extend({
  method: literal("resources/unsubscribe"),
  params: UnsubscribeRequestParamsSchema
}), ResourceUpdatedNotificationParamsSchema = NotificationsParamsSchema.extend({
  /**
   * The URI of the resource that has been updated. This might be a sub-resource of the one that the client actually subscribed to.
   */
  uri: string2()
}), ResourceUpdatedNotificationSchema = NotificationSchema.extend({
  method: literal("notifications/resources/updated"),
  params: ResourceUpdatedNotificationParamsSchema
}), PromptArgumentSchema = object2({
  /**
   * The name of the argument.
   */
  name: string2(),
  /**
   * A human-readable description of the argument.
   */
  description: optional(string2()),
  /**
   * Whether this argument must be provided.
   */
  required: optional(boolean2())
}), PromptSchema = object2({
  ...BaseMetadataSchema.shape,
  ...IconsSchema.shape,
  /**
   * An optional description of what this prompt provides
   */
  description: optional(string2()),
  /**
   * A list of arguments to use for templating the prompt.
   */
  arguments: optional(array(PromptArgumentSchema)),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: optional(looseObject({}))
}), ListPromptsRequestSchema = PaginatedRequestSchema.extend({
  method: literal("prompts/list")
}), ListPromptsResultSchema = PaginatedResultSchema.extend({
  prompts: array(PromptSchema)
}), GetPromptRequestParamsSchema = BaseRequestParamsSchema.extend({
  /**
   * The name of the prompt or prompt template.
   */
  name: string2(),
  /**
   * Arguments to use for templating the prompt.
   */
  arguments: record(string2(), string2()).optional()
}), GetPromptRequestSchema = RequestSchema.extend({
  method: literal("prompts/get"),
  params: GetPromptRequestParamsSchema
}), TextContentSchema = object2({
  type: literal("text"),
  /**
   * The text content of the message.
   */
  text: string2(),
  /**
   * Optional annotations for the client.
   */
  annotations: AnnotationsSchema.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: record(string2(), unknown()).optional()
}), ImageContentSchema = object2({
  type: literal("image"),
  /**
   * The base64-encoded image data.
   */
  data: Base64Schema,
  /**
   * The MIME type of the image. Different providers may support different image types.
   */
  mimeType: string2(),
  /**
   * Optional annotations for the client.
   */
  annotations: AnnotationsSchema.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: record(string2(), unknown()).optional()
}), AudioContentSchema = object2({
  type: literal("audio"),
  /**
   * The base64-encoded audio data.
   */
  data: Base64Schema,
  /**
   * The MIME type of the audio. Different providers may support different audio types.
   */
  mimeType: string2(),
  /**
   * Optional annotations for the client.
   */
  annotations: AnnotationsSchema.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: record(string2(), unknown()).optional()
}), ToolUseContentSchema = object2({
  type: literal("tool_use"),
  /**
   * The name of the tool to invoke.
   * Must match a tool name from the request's tools array.
   */
  name: string2(),
  /**
   * Unique identifier for this tool call.
   * Used to correlate with ToolResultContent in subsequent messages.
   */
  id: string2(),
  /**
   * Arguments to pass to the tool.
   * Must conform to the tool's inputSchema.
   */
  input: record(string2(), unknown()),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: record(string2(), unknown()).optional()
}), EmbeddedResourceSchema = object2({
  type: literal("resource"),
  resource: union([TextResourceContentsSchema, BlobResourceContentsSchema]),
  /**
   * Optional annotations for the client.
   */
  annotations: AnnotationsSchema.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: record(string2(), unknown()).optional()
}), ResourceLinkSchema = ResourceSchema.extend({
  type: literal("resource_link")
}), ContentBlockSchema = union([
  TextContentSchema,
  ImageContentSchema,
  AudioContentSchema,
  ResourceLinkSchema,
  EmbeddedResourceSchema
]), PromptMessageSchema = object2({
  role: RoleSchema,
  content: ContentBlockSchema
}), GetPromptResultSchema = ResultSchema.extend({
  /**
   * An optional description for the prompt.
   */
  description: string2().optional(),
  messages: array(PromptMessageSchema)
}), PromptListChangedNotificationSchema = NotificationSchema.extend({
  method: literal("notifications/prompts/list_changed"),
  params: NotificationsParamsSchema.optional()
}), ToolAnnotationsSchema = object2({
  /**
   * A human-readable title for the tool.
   */
  title: string2().optional(),
  /**
   * If true, the tool does not modify its environment.
   *
   * Default: false
   */
  readOnlyHint: boolean2().optional(),
  /**
   * If true, the tool may perform destructive updates to its environment.
   * If false, the tool performs only additive updates.
   *
   * (This property is meaningful only when `readOnlyHint == false`)
   *
   * Default: true
   */
  destructiveHint: boolean2().optional(),
  /**
   * If true, calling the tool repeatedly with the same arguments
   * will have no additional effect on the its environment.
   *
   * (This property is meaningful only when `readOnlyHint == false`)
   *
   * Default: false
   */
  idempotentHint: boolean2().optional(),
  /**
   * If true, this tool may interact with an "open world" of external
   * entities. If false, the tool's domain of interaction is closed.
   * For example, the world of a web search tool is open, whereas that
   * of a memory tool is not.
   *
   * Default: true
   */
  openWorldHint: boolean2().optional()
}), ToolExecutionSchema = object2({
  /**
   * Indicates the tool's preference for task-augmented execution.
   * - "required": Clients MUST invoke the tool as a task
   * - "optional": Clients MAY invoke the tool as a task or normal request
   * - "forbidden": Clients MUST NOT attempt to invoke the tool as a task
   *
   * If not present, defaults to "forbidden".
   */
  taskSupport: _enum2(["required", "optional", "forbidden"]).optional()
}), ToolSchema = object2({
  ...BaseMetadataSchema.shape,
  ...IconsSchema.shape,
  /**
   * A human-readable description of the tool.
   */
  description: string2().optional(),
  /**
   * A JSON Schema 2020-12 object defining the expected parameters for the tool.
   * Must have type: 'object' at the root level per MCP spec.
   */
  inputSchema: object2({
    type: literal("object"),
    properties: record(string2(), AssertObjectSchema).optional(),
    required: array(string2()).optional()
  }).catchall(unknown()),
  /**
   * An optional JSON Schema 2020-12 object defining the structure of the tool's output
   * returned in the structuredContent field of a CallToolResult.
   * Must have type: 'object' at the root level per MCP spec.
   */
  outputSchema: object2({
    type: literal("object"),
    properties: record(string2(), AssertObjectSchema).optional(),
    required: array(string2()).optional()
  }).catchall(unknown()).optional(),
  /**
   * Optional additional tool information.
   */
  annotations: ToolAnnotationsSchema.optional(),
  /**
   * Execution-related properties for this tool.
   */
  execution: ToolExecutionSchema.optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: record(string2(), unknown()).optional()
}), ListToolsRequestSchema = PaginatedRequestSchema.extend({
  method: literal("tools/list")
}), ListToolsResultSchema = PaginatedResultSchema.extend({
  tools: array(ToolSchema)
}), CallToolResultSchema = ResultSchema.extend({
  /**
   * A list of content objects that represent the result of the tool call.
   *
   * If the Tool does not define an outputSchema, this field MUST be present in the result.
   * For backwards compatibility, this field is always present, but it may be empty.
   */
  content: array(ContentBlockSchema).default([]),
  /**
   * An object containing structured tool output.
   *
   * If the Tool defines an outputSchema, this field MUST be present in the result, and contain a JSON object that matches the schema.
   */
  structuredContent: record(string2(), unknown()).optional(),
  /**
   * Whether the tool call ended in an error.
   *
   * If not set, this is assumed to be false (the call was successful).
   *
   * Any errors that originate from the tool SHOULD be reported inside the result
   * object, with `isError` set to true, _not_ as an MCP protocol-level error
   * response. Otherwise, the LLM would not be able to see that an error occurred
   * and self-correct.
   *
   * However, any errors in _finding_ the tool, an error indicating that the
   * server does not support tool calls, or any other exceptional conditions,
   * should be reported as an MCP error response.
   */
  isError: boolean2().optional()
}), CompatibilityCallToolResultSchema = CallToolResultSchema.or(ResultSchema.extend({
  toolResult: unknown()
})), CallToolRequestParamsSchema = TaskAugmentedRequestParamsSchema.extend({
  /**
   * The name of the tool to call.
   */
  name: string2(),
  /**
   * Arguments to pass to the tool.
   */
  arguments: record(string2(), unknown()).optional()
}), CallToolRequestSchema = RequestSchema.extend({
  method: literal("tools/call"),
  params: CallToolRequestParamsSchema
}), ToolListChangedNotificationSchema = NotificationSchema.extend({
  method: literal("notifications/tools/list_changed"),
  params: NotificationsParamsSchema.optional()
}), ListChangedOptionsBaseSchema = object2({
  /**
   * If true, the list will be refreshed automatically when a list changed notification is received.
   * The callback will be called with the updated list.
   *
   * If false, the callback will be called with null items, allowing manual refresh.
   *
   * @default true
   */
  autoRefresh: boolean2().default(!0),
  /**
   * Debounce time in milliseconds for list changed notification processing.
   *
   * Multiple notifications received within this timeframe will only trigger one refresh.
   * Set to 0 to disable debouncing.
   *
   * @default 300
   */
  debounceMs: number2().int().nonnegative().default(300)
}), LoggingLevelSchema = _enum2(["debug", "info", "notice", "warning", "error", "critical", "alert", "emergency"]), SetLevelRequestParamsSchema = BaseRequestParamsSchema.extend({
  /**
   * The level of logging that the client wants to receive from the server. The server should send all logs at this level and higher (i.e., more severe) to the client as notifications/logging/message.
   */
  level: LoggingLevelSchema
}), SetLevelRequestSchema = RequestSchema.extend({
  method: literal("logging/setLevel"),
  params: SetLevelRequestParamsSchema
}), LoggingMessageNotificationParamsSchema = NotificationsParamsSchema.extend({
  /**
   * The severity of this log message.
   */
  level: LoggingLevelSchema,
  /**
   * An optional name of the logger issuing this message.
   */
  logger: string2().optional(),
  /**
   * The data to be logged, such as a string message or an object. Any JSON serializable type is allowed here.
   */
  data: unknown()
}), LoggingMessageNotificationSchema = NotificationSchema.extend({
  method: literal("notifications/message"),
  params: LoggingMessageNotificationParamsSchema
}), ModelHintSchema = object2({
  /**
   * A hint for a model name.
   */
  name: string2().optional()
}), ModelPreferencesSchema = object2({
  /**
   * Optional hints to use for model selection.
   */
  hints: array(ModelHintSchema).optional(),
  /**
   * How much to prioritize cost when selecting a model.
   */
  costPriority: number2().min(0).max(1).optional(),
  /**
   * How much to prioritize sampling speed (latency) when selecting a model.
   */
  speedPriority: number2().min(0).max(1).optional(),
  /**
   * How much to prioritize intelligence and capabilities when selecting a model.
   */
  intelligencePriority: number2().min(0).max(1).optional()
}), ToolChoiceSchema = object2({
  /**
   * Controls when tools are used:
   * - "auto": Model decides whether to use tools (default)
   * - "required": Model MUST use at least one tool before completing
   * - "none": Model MUST NOT use any tools
   */
  mode: _enum2(["auto", "required", "none"]).optional()
}), ToolResultContentSchema = object2({
  type: literal("tool_result"),
  toolUseId: string2().describe("The unique identifier for the corresponding tool call."),
  content: array(ContentBlockSchema).default([]),
  structuredContent: object2({}).loose().optional(),
  isError: boolean2().optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: record(string2(), unknown()).optional()
}), SamplingContentSchema = discriminatedUnion("type", [TextContentSchema, ImageContentSchema, AudioContentSchema]), SamplingMessageContentBlockSchema = discriminatedUnion("type", [
  TextContentSchema,
  ImageContentSchema,
  AudioContentSchema,
  ToolUseContentSchema,
  ToolResultContentSchema
]), SamplingMessageSchema = object2({
  role: RoleSchema,
  content: union([SamplingMessageContentBlockSchema, array(SamplingMessageContentBlockSchema)]),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: record(string2(), unknown()).optional()
}), CreateMessageRequestParamsSchema = TaskAugmentedRequestParamsSchema.extend({
  messages: array(SamplingMessageSchema),
  /**
   * The server's preferences for which model to select. The client MAY modify or omit this request.
   */
  modelPreferences: ModelPreferencesSchema.optional(),
  /**
   * An optional system prompt the server wants to use for sampling. The client MAY modify or omit this prompt.
   */
  systemPrompt: string2().optional(),
  /**
   * A request to include context from one or more MCP servers (including the caller), to be attached to the prompt.
   * The client MAY ignore this request.
   *
   * Default is "none". Values "thisServer" and "allServers" are soft-deprecated. Servers SHOULD only use these values if the client
   * declares ClientCapabilities.sampling.context. These values may be removed in future spec releases.
   */
  includeContext: _enum2(["none", "thisServer", "allServers"]).optional(),
  temperature: number2().optional(),
  /**
   * The requested maximum number of tokens to sample (to prevent runaway completions).
   *
   * The client MAY choose to sample fewer tokens than the requested maximum.
   */
  maxTokens: number2().int(),
  stopSequences: array(string2()).optional(),
  /**
   * Optional metadata to pass through to the LLM provider. The format of this metadata is provider-specific.
   */
  metadata: AssertObjectSchema.optional(),
  /**
   * Tools that the model may use during generation.
   * The client MUST return an error if this field is provided but ClientCapabilities.sampling.tools is not declared.
   */
  tools: array(ToolSchema).optional(),
  /**
   * Controls how the model uses tools.
   * The client MUST return an error if this field is provided but ClientCapabilities.sampling.tools is not declared.
   * Default is `{ mode: "auto" }`.
   */
  toolChoice: ToolChoiceSchema.optional()
}), CreateMessageRequestSchema = RequestSchema.extend({
  method: literal("sampling/createMessage"),
  params: CreateMessageRequestParamsSchema
}), CreateMessageResultSchema = ResultSchema.extend({
  /**
   * The name of the model that generated the message.
   */
  model: string2(),
  /**
   * The reason why sampling stopped, if known.
   *
   * Standard values:
   * - "endTurn": Natural end of the assistant's turn
   * - "stopSequence": A stop sequence was encountered
   * - "maxTokens": Maximum token limit was reached
   *
   * This field is an open string to allow for provider-specific stop reasons.
   */
  stopReason: optional(_enum2(["endTurn", "stopSequence", "maxTokens"]).or(string2())),
  role: RoleSchema,
  /**
   * Response content. Single content block (text, image, or audio).
   */
  content: SamplingContentSchema
}), CreateMessageResultWithToolsSchema = ResultSchema.extend({
  /**
   * The name of the model that generated the message.
   */
  model: string2(),
  /**
   * The reason why sampling stopped, if known.
   *
   * Standard values:
   * - "endTurn": Natural end of the assistant's turn
   * - "stopSequence": A stop sequence was encountered
   * - "maxTokens": Maximum token limit was reached
   * - "toolUse": The model wants to use one or more tools
   *
   * This field is an open string to allow for provider-specific stop reasons.
   */
  stopReason: optional(_enum2(["endTurn", "stopSequence", "maxTokens", "toolUse"]).or(string2())),
  role: RoleSchema,
  /**
   * Response content. May be a single block or array. May include ToolUseContent if stopReason is "toolUse".
   */
  content: union([SamplingMessageContentBlockSchema, array(SamplingMessageContentBlockSchema)])
}), BooleanSchemaSchema = object2({
  type: literal("boolean"),
  title: string2().optional(),
  description: string2().optional(),
  default: boolean2().optional()
}), StringSchemaSchema = object2({
  type: literal("string"),
  title: string2().optional(),
  description: string2().optional(),
  minLength: number2().optional(),
  maxLength: number2().optional(),
  format: _enum2(["email", "uri", "date", "date-time"]).optional(),
  default: string2().optional()
}), NumberSchemaSchema = object2({
  type: _enum2(["number", "integer"]),
  title: string2().optional(),
  description: string2().optional(),
  minimum: number2().optional(),
  maximum: number2().optional(),
  default: number2().optional()
}), UntitledSingleSelectEnumSchemaSchema = object2({
  type: literal("string"),
  title: string2().optional(),
  description: string2().optional(),
  enum: array(string2()),
  default: string2().optional()
}), TitledSingleSelectEnumSchemaSchema = object2({
  type: literal("string"),
  title: string2().optional(),
  description: string2().optional(),
  oneOf: array(object2({
    const: string2(),
    title: string2()
  })),
  default: string2().optional()
}), LegacyTitledEnumSchemaSchema = object2({
  type: literal("string"),
  title: string2().optional(),
  description: string2().optional(),
  enum: array(string2()),
  enumNames: array(string2()).optional(),
  default: string2().optional()
}), SingleSelectEnumSchemaSchema = union([UntitledSingleSelectEnumSchemaSchema, TitledSingleSelectEnumSchemaSchema]), UntitledMultiSelectEnumSchemaSchema = object2({
  type: literal("array"),
  title: string2().optional(),
  description: string2().optional(),
  minItems: number2().optional(),
  maxItems: number2().optional(),
  items: object2({
    type: literal("string"),
    enum: array(string2())
  }),
  default: array(string2()).optional()
}), TitledMultiSelectEnumSchemaSchema = object2({
  type: literal("array"),
  title: string2().optional(),
  description: string2().optional(),
  minItems: number2().optional(),
  maxItems: number2().optional(),
  items: object2({
    anyOf: array(object2({
      const: string2(),
      title: string2()
    }))
  }),
  default: array(string2()).optional()
}), MultiSelectEnumSchemaSchema = union([UntitledMultiSelectEnumSchemaSchema, TitledMultiSelectEnumSchemaSchema]), EnumSchemaSchema = union([LegacyTitledEnumSchemaSchema, SingleSelectEnumSchemaSchema, MultiSelectEnumSchemaSchema]), PrimitiveSchemaDefinitionSchema = union([EnumSchemaSchema, BooleanSchemaSchema, StringSchemaSchema, NumberSchemaSchema]), ElicitRequestFormParamsSchema = TaskAugmentedRequestParamsSchema.extend({
  /**
   * The elicitation mode.
   *
   * Optional for backward compatibility. Clients MUST treat missing mode as "form".
   */
  mode: literal("form").optional(),
  /**
   * The message to present to the user describing what information is being requested.
   */
  message: string2(),
  /**
   * A restricted subset of JSON Schema.
   * Only top-level properties are allowed, without nesting.
   */
  requestedSchema: object2({
    type: literal("object"),
    properties: record(string2(), PrimitiveSchemaDefinitionSchema),
    required: array(string2()).optional()
  })
}), ElicitRequestURLParamsSchema = TaskAugmentedRequestParamsSchema.extend({
  /**
   * The elicitation mode.
   */
  mode: literal("url"),
  /**
   * The message to present to the user explaining why the interaction is needed.
   */
  message: string2(),
  /**
   * The ID of the elicitation, which must be unique within the context of the server.
   * The client MUST treat this ID as an opaque value.
   */
  elicitationId: string2(),
  /**
   * The URL that the user should navigate to.
   */
  url: string2().url()
}), ElicitRequestParamsSchema = union([ElicitRequestFormParamsSchema, ElicitRequestURLParamsSchema]), ElicitRequestSchema = RequestSchema.extend({
  method: literal("elicitation/create"),
  params: ElicitRequestParamsSchema
}), ElicitationCompleteNotificationParamsSchema = NotificationsParamsSchema.extend({
  /**
   * The ID of the elicitation that completed.
   */
  elicitationId: string2()
}), ElicitationCompleteNotificationSchema = NotificationSchema.extend({
  method: literal("notifications/elicitation/complete"),
  params: ElicitationCompleteNotificationParamsSchema
}), ElicitResultSchema = ResultSchema.extend({
  /**
   * The user action in response to the elicitation.
   * - "accept": User submitted the form/confirmed the action
   * - "decline": User explicitly decline the action
   * - "cancel": User dismissed without making an explicit choice
   */
  action: _enum2(["accept", "decline", "cancel"]),
  /**
   * The submitted form data, only present when action is "accept".
   * Contains values matching the requested schema.
   * Per MCP spec, content is "typically omitted" for decline/cancel actions.
   * We normalize null to undefined for leniency while maintaining type compatibility.
   */
  content: preprocess((val) => val === null ? void 0 : val, record(string2(), union([string2(), number2(), boolean2(), array(string2())])).optional())
}), ResourceTemplateReferenceSchema = object2({
  type: literal("ref/resource"),
  /**
   * The URI or URI template of the resource.
   */
  uri: string2()
});
var PromptReferenceSchema = object2({
  type: literal("ref/prompt"),
  /**
   * The name of the prompt or prompt template
   */
  name: string2()
}), CompleteRequestParamsSchema = BaseRequestParamsSchema.extend({
  ref: union([PromptReferenceSchema, ResourceTemplateReferenceSchema]),
  /**
   * The argument's information
   */
  argument: object2({
    /**
     * The name of the argument
     */
    name: string2(),
    /**
     * The value of the argument to use for completion matching.
     */
    value: string2()
  }),
  context: object2({
    /**
     * Previously-resolved variables in a URI template or prompt.
     */
    arguments: record(string2(), string2()).optional()
  }).optional()
}), CompleteRequestSchema = RequestSchema.extend({
  method: literal("completion/complete"),
  params: CompleteRequestParamsSchema
});
function assertCompleteRequestPrompt(request2) {
  if (request2.params.ref.type !== "ref/prompt")
    throw new TypeError(`Expected CompleteRequestPrompt, but got ${request2.params.ref.type}`);
}
function assertCompleteRequestResourceTemplate(request2) {
  if (request2.params.ref.type !== "ref/resource")
    throw new TypeError(`Expected CompleteRequestResourceTemplate, but got ${request2.params.ref.type}`);
}
var CompleteResultSchema = ResultSchema.extend({
  completion: looseObject({
    /**
     * An array of completion values. Must not exceed 100 items.
     */
    values: array(string2()).max(100),
    /**
     * The total number of completion options available. This can exceed the number of values actually sent in the response.
     */
    total: optional(number2().int()),
    /**
     * Indicates whether there are additional completion options beyond those provided in the current response, even if the exact total is unknown.
     */
    hasMore: optional(boolean2())
  })
}), RootSchema = object2({
  /**
   * The URI identifying the root. This *must* start with file:// for now.
   */
  uri: string2().startsWith("file://"),
  /**
   * An optional name for the root.
   */
  name: string2().optional(),
  /**
   * See [MCP specification](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/47339c03c143bb4ec01a26e721a1b8fe66634ebe/docs/specification/draft/basic/index.mdx#general-fields)
   * for notes on _meta usage.
   */
  _meta: record(string2(), unknown()).optional()
}), ListRootsRequestSchema = RequestSchema.extend({
  method: literal("roots/list"),
  params: BaseRequestParamsSchema.optional()
}), ListRootsResultSchema = ResultSchema.extend({
  roots: array(RootSchema)
}), RootsListChangedNotificationSchema = NotificationSchema.extend({
  method: literal("notifications/roots/list_changed"),
  params: NotificationsParamsSchema.optional()
}), ClientRequestSchema = union([
  PingRequestSchema,
  InitializeRequestSchema,
  CompleteRequestSchema,
  SetLevelRequestSchema,
  GetPromptRequestSchema,
  ListPromptsRequestSchema,
  ListResourcesRequestSchema,
  ListResourceTemplatesRequestSchema,
  ReadResourceRequestSchema,
  SubscribeRequestSchema,
  UnsubscribeRequestSchema,
  CallToolRequestSchema,
  ListToolsRequestSchema,
  GetTaskRequestSchema,
  GetTaskPayloadRequestSchema,
  ListTasksRequestSchema,
  CancelTaskRequestSchema
]), ClientNotificationSchema = union([
  CancelledNotificationSchema,
  ProgressNotificationSchema,
  InitializedNotificationSchema,
  RootsListChangedNotificationSchema,
  TaskStatusNotificationSchema
]), ClientResultSchema = union([
  EmptyResultSchema,
  CreateMessageResultSchema,
  CreateMessageResultWithToolsSchema,
  ElicitResultSchema,
  ListRootsResultSchema,
  GetTaskResultSchema,
  ListTasksResultSchema,
  CreateTaskResultSchema
]), ServerRequestSchema = union([
  PingRequestSchema,
  CreateMessageRequestSchema,
  ElicitRequestSchema,
  ListRootsRequestSchema,
  GetTaskRequestSchema,
  GetTaskPayloadRequestSchema,
  ListTasksRequestSchema,
  CancelTaskRequestSchema
]), ServerNotificationSchema = union([
  CancelledNotificationSchema,
  ProgressNotificationSchema,
  LoggingMessageNotificationSchema,
  ResourceUpdatedNotificationSchema,
  ResourceListChangedNotificationSchema,
  ToolListChangedNotificationSchema,
  PromptListChangedNotificationSchema,
  TaskStatusNotificationSchema,
  ElicitationCompleteNotificationSchema
]), ServerResultSchema = union([
  EmptyResultSchema,
  InitializeResultSchema,
  CompleteResultSchema,
  GetPromptResultSchema,
  ListPromptsResultSchema,
  ListResourcesResultSchema,
  ListResourceTemplatesResultSchema,
  ReadResourceResultSchema,
  CallToolResultSchema,
  ListToolsResultSchema,
  GetTaskResultSchema,
  ListTasksResultSchema,
  CreateTaskResultSchema
]), McpError = class _McpError extends Error {
  constructor(code, message, data3) {
    super(`MCP error ${code}: ${message}`), this.code = code, this.data = data3, this.name = "McpError";
  }
  /**
   * Factory method to create the appropriate error type based on the error code and data
   */
  static fromError(code, message, data3) {
    if (code === ErrorCode.UrlElicitationRequired && data3) {
      let errorData = data3;
      if (errorData.elicitations)
        return new UrlElicitationRequiredError(errorData.elicitations, message);
    }
    return new _McpError(code, message, data3);
  }
}, UrlElicitationRequiredError = class extends McpError {
  constructor(elicitations, message = `URL elicitation${elicitations.length > 1 ? "s" : ""} required`) {
    super(ErrorCode.UrlElicitationRequired, message, {
      elicitations
    });
  }
  get elicitations() {
    return this.data?.elicitations ?? [];
  }
};

// node_modules/@modelcontextprotocol/sdk/dist/esm/experimental/tasks/interfaces.js
function isTerminal(status) {
  return status === "completed" || status === "failed" || status === "cancelled";
}

// node_modules/zod-to-json-schema/dist/esm/Options.js
var ignoreOverride = /* @__PURE__ */ Symbol("Let zodToJsonSchema decide on which parser to use");
var defaultOptions = {
  name: void 0,
  $refStrategy: "root",
  basePath: ["#"],
  effectStrategy: "input",
  pipeStrategy: "all",
  dateStrategy: "format:date-time",
  mapStrategy: "entries",
  removeAdditionalStrategy: "passthrough",
  allowedAdditionalProperties: !0,
  rejectedAdditionalProperties: !1,
  definitionPath: "definitions",
  target: "jsonSchema7",
  strictUnions: !1,
  definitions: {},
  errorMessages: !1,
  markdownDescription: !1,
  patternStrategy: "escape",
  applyRegexFlags: !1,
  emailStrategy: "format:email",
  base64Strategy: "contentEncoding:base64",
  nameStrategy: "ref",
  openAiAnyTypeName: "OpenAiAnyType"
}, getDefaultOptions = (options) => typeof options == "string" ? {
  ...defaultOptions,
  name: options
} : {
  ...defaultOptions,
  ...options
};

// node_modules/zod-to-json-schema/dist/esm/Refs.js
var getRefs = (options) => {
  let _options = getDefaultOptions(options), currentPath = _options.name !== void 0 ? [..._options.basePath, _options.definitionPath, _options.name] : _options.basePath;
  return {
    ..._options,
    flags: { hasReferencedOpenAiAnyType: !1 },
    currentPath,
    propertyPath: void 0,
    seen: new Map(Object.entries(_options.definitions).map(([name2, def2]) => [
      def2._def,
      {
        def: def2._def,
        path: [..._options.basePath, _options.definitionPath, name2],
        // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
        jsonSchema: void 0
      }
    ]))
  };
};

// node_modules/zod-to-json-schema/dist/esm/errorMessages.js
function addErrorMessage(res, key2, errorMessage, refs) {
  refs?.errorMessages && errorMessage && (res.errorMessage = {
    ...res.errorMessage,
    [key2]: errorMessage
  });
}
function setResponseValueAndErrors(res, key2, value3, errorMessage, refs) {
  res[key2] = value3, addErrorMessage(res, key2, errorMessage, refs);
}

// node_modules/zod-to-json-schema/dist/esm/getRelativePath.js
var getRelativePath = (pathA, pathB) => {
  let i = 0;
  for (; i < pathA.length && i < pathB.length && pathA[i] === pathB[i]; i++)
    ;
  return [(pathA.length - i).toString(), ...pathB.slice(i)].join("/");
};

// node_modules/zod-to-json-schema/dist/esm/parsers/any.js
function parseAnyDef(refs) {
  if (refs.target !== "openAi")
    return {};
  let anyDefinitionPath = [
    ...refs.basePath,
    refs.definitionPath,
    refs.openAiAnyTypeName
  ];
  return refs.flags.hasReferencedOpenAiAnyType = !0, {
    $ref: refs.$refStrategy === "relative" ? getRelativePath(anyDefinitionPath, refs.currentPath) : anyDefinitionPath.join("/")
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/array.js
function parseArrayDef(def2, refs) {
  let res = {
    type: "array"
  };
  return def2.type?._def && def2.type?._def?.typeName !== ZodFirstPartyTypeKind.ZodAny && (res.items = parseDef(def2.type._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items"]
  })), def2.minLength && setResponseValueAndErrors(res, "minItems", def2.minLength.value, def2.minLength.message, refs), def2.maxLength && setResponseValueAndErrors(res, "maxItems", def2.maxLength.value, def2.maxLength.message, refs), def2.exactLength && (setResponseValueAndErrors(res, "minItems", def2.exactLength.value, def2.exactLength.message, refs), setResponseValueAndErrors(res, "maxItems", def2.exactLength.value, def2.exactLength.message, refs)), res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/bigint.js
function parseBigintDef(def2, refs) {
  let res = {
    type: "integer",
    format: "int64"
  };
  if (!def2.checks)
    return res;
  for (let check2 of def2.checks)
    switch (check2.kind) {
      case "min":
        refs.target === "jsonSchema7" ? check2.inclusive ? setResponseValueAndErrors(res, "minimum", check2.value, check2.message, refs) : setResponseValueAndErrors(res, "exclusiveMinimum", check2.value, check2.message, refs) : (check2.inclusive || (res.exclusiveMinimum = !0), setResponseValueAndErrors(res, "minimum", check2.value, check2.message, refs));
        break;
      case "max":
        refs.target === "jsonSchema7" ? check2.inclusive ? setResponseValueAndErrors(res, "maximum", check2.value, check2.message, refs) : setResponseValueAndErrors(res, "exclusiveMaximum", check2.value, check2.message, refs) : (check2.inclusive || (res.exclusiveMaximum = !0), setResponseValueAndErrors(res, "maximum", check2.value, check2.message, refs));
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check2.value, check2.message, refs);
        break;
    }
  return res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/boolean.js
function parseBooleanDef() {
  return {
    type: "boolean"
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/branded.js
function parseBrandedDef(_def, refs) {
  return parseDef(_def.type._def, refs);
}

// node_modules/zod-to-json-schema/dist/esm/parsers/catch.js
var parseCatchDef = (def2, refs) => parseDef(def2.innerType._def, refs);

// node_modules/zod-to-json-schema/dist/esm/parsers/date.js
function parseDateDef(def2, refs, overrideDateStrategy) {
  let strategy = overrideDateStrategy ?? refs.dateStrategy;
  if (Array.isArray(strategy))
    return {
      anyOf: strategy.map((item, i) => parseDateDef(def2, refs, item))
    };
  switch (strategy) {
    case "string":
    case "format:date-time":
      return {
        type: "string",
        format: "date-time"
      };
    case "format:date":
      return {
        type: "string",
        format: "date"
      };
    case "integer":
      return integerDateParser(def2, refs);
  }
}
var integerDateParser = (def2, refs) => {
  let res = {
    type: "integer",
    format: "unix-time"
  };
  if (refs.target === "openApi3")
    return res;
  for (let check2 of def2.checks)
    switch (check2.kind) {
      case "min":
        setResponseValueAndErrors(
          res,
          "minimum",
          check2.value,
          // This is in milliseconds
          check2.message,
          refs
        );
        break;
      case "max":
        setResponseValueAndErrors(
          res,
          "maximum",
          check2.value,
          // This is in milliseconds
          check2.message,
          refs
        );
        break;
    }
  return res;
};

// node_modules/zod-to-json-schema/dist/esm/parsers/default.js
function parseDefaultDef(_def, refs) {
  return {
    ...parseDef(_def.innerType._def, refs),
    default: _def.defaultValue()
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/effects.js
function parseEffectsDef(_def, refs) {
  return refs.effectStrategy === "input" ? parseDef(_def.schema._def, refs) : parseAnyDef(refs);
}

// node_modules/zod-to-json-schema/dist/esm/parsers/enum.js
function parseEnumDef(def2) {
  return {
    type: "string",
    enum: Array.from(def2.values)
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/intersection.js
var isJsonSchema7AllOfType = (type3) => "type" in type3 && type3.type === "string" ? !1 : "allOf" in type3;
function parseIntersectionDef(def2, refs) {
  let allOf = [
    parseDef(def2.left._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "0"]
    }),
    parseDef(def2.right._def, {
      ...refs,
      currentPath: [...refs.currentPath, "allOf", "1"]
    })
  ].filter((x5) => !!x5), unevaluatedProperties = refs.target === "jsonSchema2019-09" ? { unevaluatedProperties: !1 } : void 0, mergedAllOf = [];
  return allOf.forEach((schema) => {
    if (isJsonSchema7AllOfType(schema))
      mergedAllOf.push(...schema.allOf), schema.unevaluatedProperties === void 0 && (unevaluatedProperties = void 0);
    else {
      let nestedSchema = schema;
      if ("additionalProperties" in schema && schema.additionalProperties === !1) {
        let { additionalProperties, ...rest } = schema;
        nestedSchema = rest;
      } else
        unevaluatedProperties = void 0;
      mergedAllOf.push(nestedSchema);
    }
  }), mergedAllOf.length ? {
    allOf: mergedAllOf,
    ...unevaluatedProperties
  } : void 0;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/literal.js
function parseLiteralDef(def2, refs) {
  let parsedType2 = typeof def2.value;
  return parsedType2 !== "bigint" && parsedType2 !== "number" && parsedType2 !== "boolean" && parsedType2 !== "string" ? {
    type: Array.isArray(def2.value) ? "array" : "object"
  } : refs.target === "openApi3" ? {
    type: parsedType2 === "bigint" ? "integer" : parsedType2,
    enum: [def2.value]
  } : {
    type: parsedType2 === "bigint" ? "integer" : parsedType2,
    const: def2.value
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/string.js
var emojiRegex2, zodPatterns = {
  /**
   * `c` was changed to `[cC]` to replicate /i flag
   */
  cuid: /^[cC][^\s-]{8,}$/,
  cuid2: /^[0-9a-z]+$/,
  ulid: /^[0-9A-HJKMNP-TV-Z]{26}$/,
  /**
   * `a-z` was added to replicate /i flag
   */
  email: /^(?!\.)(?!.*\.\.)([a-zA-Z0-9_'+\-\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\-]*\.)+[a-zA-Z]{2,}$/,
  /**
   * Constructed a valid Unicode RegExp
   *
   * Lazily instantiate since this type of regex isn't supported
   * in all envs (e.g. React Native).
   *
   * See:
   * https://github.com/colinhacks/zod/issues/2433
   * Fix in Zod:
   * https://github.com/colinhacks/zod/commit/9340fd51e48576a75adc919bff65dbc4a5d4c99b
   */
  emoji: () => (emojiRegex2 === void 0 && (emojiRegex2 = RegExp("^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$", "u")), emojiRegex2),
  /**
   * Unused
   */
  uuid: /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  /**
   * Unused
   */
  ipv4: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
  ipv4Cidr: /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
  /**
   * Unused
   */
  ipv6: /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  ipv6Cidr: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
  base64: /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
  base64url: /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
  nanoid: /^[a-zA-Z0-9_-]{21}$/,
  jwt: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/
};
function parseStringDef(def2, refs) {
  let res = {
    type: "string"
  };
  if (def2.checks)
    for (let check2 of def2.checks)
      switch (check2.kind) {
        case "min":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength == "number" ? Math.max(res.minLength, check2.value) : check2.value, check2.message, refs);
          break;
        case "max":
          setResponseValueAndErrors(res, "maxLength", typeof res.maxLength == "number" ? Math.min(res.maxLength, check2.value) : check2.value, check2.message, refs);
          break;
        case "email":
          switch (refs.emailStrategy) {
            case "format:email":
              addFormat(res, "email", check2.message, refs);
              break;
            case "format:idn-email":
              addFormat(res, "idn-email", check2.message, refs);
              break;
            case "pattern:zod":
              addPattern2(res, zodPatterns.email, check2.message, refs);
              break;
          }
          break;
        case "url":
          addFormat(res, "uri", check2.message, refs);
          break;
        case "uuid":
          addFormat(res, "uuid", check2.message, refs);
          break;
        case "regex":
          addPattern2(res, check2.regex, check2.message, refs);
          break;
        case "cuid":
          addPattern2(res, zodPatterns.cuid, check2.message, refs);
          break;
        case "cuid2":
          addPattern2(res, zodPatterns.cuid2, check2.message, refs);
          break;
        case "startsWith":
          addPattern2(res, RegExp(`^${escapeLiteralCheckValue(check2.value, refs)}`), check2.message, refs);
          break;
        case "endsWith":
          addPattern2(res, RegExp(`${escapeLiteralCheckValue(check2.value, refs)}$`), check2.message, refs);
          break;
        case "datetime":
          addFormat(res, "date-time", check2.message, refs);
          break;
        case "date":
          addFormat(res, "date", check2.message, refs);
          break;
        case "time":
          addFormat(res, "time", check2.message, refs);
          break;
        case "duration":
          addFormat(res, "duration", check2.message, refs);
          break;
        case "length":
          setResponseValueAndErrors(res, "minLength", typeof res.minLength == "number" ? Math.max(res.minLength, check2.value) : check2.value, check2.message, refs), setResponseValueAndErrors(res, "maxLength", typeof res.maxLength == "number" ? Math.min(res.maxLength, check2.value) : check2.value, check2.message, refs);
          break;
        case "includes": {
          addPattern2(res, RegExp(escapeLiteralCheckValue(check2.value, refs)), check2.message, refs);
          break;
        }
        case "ip": {
          check2.version !== "v6" && addFormat(res, "ipv4", check2.message, refs), check2.version !== "v4" && addFormat(res, "ipv6", check2.message, refs);
          break;
        }
        case "base64url":
          addPattern2(res, zodPatterns.base64url, check2.message, refs);
          break;
        case "jwt":
          addPattern2(res, zodPatterns.jwt, check2.message, refs);
          break;
        case "cidr": {
          check2.version !== "v6" && addPattern2(res, zodPatterns.ipv4Cidr, check2.message, refs), check2.version !== "v4" && addPattern2(res, zodPatterns.ipv6Cidr, check2.message, refs);
          break;
        }
        case "emoji":
          addPattern2(res, zodPatterns.emoji(), check2.message, refs);
          break;
        case "ulid": {
          addPattern2(res, zodPatterns.ulid, check2.message, refs);
          break;
        }
        case "base64": {
          switch (refs.base64Strategy) {
            case "format:binary": {
              addFormat(res, "binary", check2.message, refs);
              break;
            }
            case "contentEncoding:base64": {
              setResponseValueAndErrors(res, "contentEncoding", "base64", check2.message, refs);
              break;
            }
            case "pattern:zod": {
              addPattern2(res, zodPatterns.base64, check2.message, refs);
              break;
            }
          }
          break;
        }
        case "nanoid":
          addPattern2(res, zodPatterns.nanoid, check2.message, refs);
        case "toLowerCase":
        case "toUpperCase":
        case "trim":
          break;
        default:
      }
  return res;
}
function escapeLiteralCheckValue(literal2, refs) {
  return refs.patternStrategy === "escape" ? escapeNonAlphaNumeric(literal2) : literal2;
}
var ALPHA_NUMERIC = new Set("ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvxyz0123456789");
function escapeNonAlphaNumeric(source4) {
  let result = "";
  for (let i = 0; i < source4.length; i++)
    ALPHA_NUMERIC.has(source4[i]) || (result += "\\"), result += source4[i];
  return result;
}
function addFormat(schema, value3, message, refs) {
  schema.format || schema.anyOf?.some((x5) => x5.format) ? (schema.anyOf || (schema.anyOf = []), schema.format && (schema.anyOf.push({
    format: schema.format,
    ...schema.errorMessage && refs.errorMessages && {
      errorMessage: { format: schema.errorMessage.format }
    }
  }), delete schema.format, schema.errorMessage && (delete schema.errorMessage.format, Object.keys(schema.errorMessage).length === 0 && delete schema.errorMessage)), schema.anyOf.push({
    format: value3,
    ...message && refs.errorMessages && { errorMessage: { format: message } }
  })) : setResponseValueAndErrors(schema, "format", value3, message, refs);
}
function addPattern2(schema, regex, message, refs) {
  schema.pattern || schema.allOf?.some((x5) => x5.pattern) ? (schema.allOf || (schema.allOf = []), schema.pattern && (schema.allOf.push({
    pattern: schema.pattern,
    ...schema.errorMessage && refs.errorMessages && {
      errorMessage: { pattern: schema.errorMessage.pattern }
    }
  }), delete schema.pattern, schema.errorMessage && (delete schema.errorMessage.pattern, Object.keys(schema.errorMessage).length === 0 && delete schema.errorMessage)), schema.allOf.push({
    pattern: stringifyRegExpWithFlags(regex, refs),
    ...message && refs.errorMessages && { errorMessage: { pattern: message } }
  })) : setResponseValueAndErrors(schema, "pattern", stringifyRegExpWithFlags(regex, refs), message, refs);
}
function stringifyRegExpWithFlags(regex, refs) {
  if (!refs.applyRegexFlags || !regex.flags)
    return regex.source;
  let flags = {
    i: regex.flags.includes("i"),
    m: regex.flags.includes("m"),
    s: regex.flags.includes("s")
    // `.` matches newlines
  }, source4 = flags.i ? regex.source.toLowerCase() : regex.source, pattern = "", isEscaped = !1, inCharGroup = !1, inCharRange = !1;
  for (let i = 0; i < source4.length; i++) {
    if (isEscaped) {
      pattern += source4[i], isEscaped = !1;
      continue;
    }
    if (flags.i) {
      if (inCharGroup) {
        if (source4[i].match(/[a-z]/)) {
          inCharRange ? (pattern += source4[i], pattern += `${source4[i - 2]}-${source4[i]}`.toUpperCase(), inCharRange = !1) : source4[i + 1] === "-" && source4[i + 2]?.match(/[a-z]/) ? (pattern += source4[i], inCharRange = !0) : pattern += `${source4[i]}${source4[i].toUpperCase()}`;
          continue;
        }
      } else if (source4[i].match(/[a-z]/)) {
        pattern += `[${source4[i]}${source4[i].toUpperCase()}]`;
        continue;
      }
    }
    if (flags.m) {
      if (source4[i] === "^") {
        pattern += `(^|(?<=[\r
]))`;
        continue;
      } else if (source4[i] === "$") {
        pattern += `($|(?=[\r
]))`;
        continue;
      }
    }
    if (flags.s && source4[i] === ".") {
      pattern += inCharGroup ? `${source4[i]}\r
` : `[${source4[i]}\r
]`;
      continue;
    }
    pattern += source4[i], source4[i] === "\\" ? isEscaped = !0 : inCharGroup && source4[i] === "]" ? inCharGroup = !1 : !inCharGroup && source4[i] === "[" && (inCharGroup = !0);
  }
  try {
    new RegExp(pattern);
  } catch {
    return console.warn(`Could not convert regex pattern at ${refs.currentPath.join("/")} to a flag-independent form! Falling back to the flag-ignorant source`), regex.source;
  }
  return pattern;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/record.js
function parseRecordDef(def2, refs) {
  if (refs.target === "openAi" && console.warn("Warning: OpenAI may not support records in schemas! Try an array of key-value pairs instead."), refs.target === "openApi3" && def2.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum)
    return {
      type: "object",
      required: def2.keyType._def.values,
      properties: def2.keyType._def.values.reduce((acc, key2) => ({
        ...acc,
        [key2]: parseDef(def2.valueType._def, {
          ...refs,
          currentPath: [...refs.currentPath, "properties", key2]
        }) ?? parseAnyDef(refs)
      }), {}),
      additionalProperties: refs.rejectedAdditionalProperties
    };
  let schema = {
    type: "object",
    additionalProperties: parseDef(def2.valueType._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    }) ?? refs.allowedAdditionalProperties
  };
  if (refs.target === "openApi3")
    return schema;
  if (def2.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodString && def2.keyType._def.checks?.length) {
    let { type: type3, ...keyType } = parseStringDef(def2.keyType._def, refs);
    return {
      ...schema,
      propertyNames: keyType
    };
  } else {
    if (def2.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodEnum)
      return {
        ...schema,
        propertyNames: {
          enum: def2.keyType._def.values
        }
      };
    if (def2.keyType?._def.typeName === ZodFirstPartyTypeKind.ZodBranded && def2.keyType._def.type._def.typeName === ZodFirstPartyTypeKind.ZodString && def2.keyType._def.type._def.checks?.length) {
      let { type: type3, ...keyType } = parseBrandedDef(def2.keyType._def, refs);
      return {
        ...schema,
        propertyNames: keyType
      };
    }
  }
  return schema;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/map.js
function parseMapDef(def2, refs) {
  if (refs.mapStrategy === "record")
    return parseRecordDef(def2, refs);
  let keys4 = parseDef(def2.keyType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "0"]
  }) || parseAnyDef(refs), values3 = parseDef(def2.valueType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "items", "items", "1"]
  }) || parseAnyDef(refs);
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [keys4, values3],
      minItems: 2,
      maxItems: 2
    }
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/nativeEnum.js
function parseNativeEnumDef(def2) {
  let object4 = def2.values, actualValues = Object.keys(def2.values).filter((key2) => typeof object4[object4[key2]] != "number").map((key2) => object4[key2]), parsedTypes = Array.from(new Set(actualValues.map((values3) => typeof values3)));
  return {
    type: parsedTypes.length === 1 ? parsedTypes[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: actualValues
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/never.js
function parseNeverDef(refs) {
  return refs.target === "openAi" ? void 0 : {
    not: parseAnyDef({
      ...refs,
      currentPath: [...refs.currentPath, "not"]
    })
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/null.js
function parseNullDef(refs) {
  return refs.target === "openApi3" ? {
    enum: ["null"],
    nullable: !0
  } : {
    type: "null"
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/union.js
var primitiveMappings = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
};
function parseUnionDef(def2, refs) {
  if (refs.target === "openApi3")
    return asAnyOf(def2, refs);
  let options = def2.options instanceof Map ? Array.from(def2.options.values()) : def2.options;
  if (options.every((x5) => x5._def.typeName in primitiveMappings && (!x5._def.checks || !x5._def.checks.length))) {
    let types = options.reduce((types2, x5) => {
      let type3 = primitiveMappings[x5._def.typeName];
      return type3 && !types2.includes(type3) ? [...types2, type3] : types2;
    }, []);
    return {
      type: types.length > 1 ? types : types[0]
    };
  } else if (options.every((x5) => x5._def.typeName === "ZodLiteral" && !x5.description)) {
    let types = options.reduce((acc, x5) => {
      let type3 = typeof x5._def.value;
      switch (type3) {
        case "string":
        case "number":
        case "boolean":
          return [...acc, type3];
        case "bigint":
          return [...acc, "integer"];
        case "object":
          if (x5._def.value === null)
            return [...acc, "null"];
        default:
          return acc;
      }
    }, []);
    if (types.length === options.length) {
      let uniqueTypes = types.filter((x5, i, a) => a.indexOf(x5) === i);
      return {
        type: uniqueTypes.length > 1 ? uniqueTypes : uniqueTypes[0],
        enum: options.reduce((acc, x5) => acc.includes(x5._def.value) ? acc : [...acc, x5._def.value], [])
      };
    }
  } else if (options.every((x5) => x5._def.typeName === "ZodEnum"))
    return {
      type: "string",
      enum: options.reduce((acc, x5) => [
        ...acc,
        ...x5._def.values.filter((x6) => !acc.includes(x6))
      ], [])
    };
  return asAnyOf(def2, refs);
}
var asAnyOf = (def2, refs) => {
  let anyOf = (def2.options instanceof Map ? Array.from(def2.options.values()) : def2.options).map((x5, i) => parseDef(x5._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", `${i}`]
  })).filter((x5) => !!x5 && (!refs.strictUnions || typeof x5 == "object" && Object.keys(x5).length > 0));
  return anyOf.length ? { anyOf } : void 0;
};

// node_modules/zod-to-json-schema/dist/esm/parsers/nullable.js
function parseNullableDef(def2, refs) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(def2.innerType._def.typeName) && (!def2.innerType._def.checks || !def2.innerType._def.checks.length))
    return refs.target === "openApi3" ? {
      type: primitiveMappings[def2.innerType._def.typeName],
      nullable: !0
    } : {
      type: [
        primitiveMappings[def2.innerType._def.typeName],
        "null"
      ]
    };
  if (refs.target === "openApi3") {
    let base2 = parseDef(def2.innerType._def, {
      ...refs,
      currentPath: [...refs.currentPath]
    });
    return base2 && "$ref" in base2 ? { allOf: [base2], nullable: !0 } : base2 && { ...base2, nullable: !0 };
  }
  let base = parseDef(def2.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "0"]
  });
  return base && { anyOf: [base, { type: "null" }] };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/number.js
function parseNumberDef(def2, refs) {
  let res = {
    type: "number"
  };
  if (!def2.checks)
    return res;
  for (let check2 of def2.checks)
    switch (check2.kind) {
      case "int":
        res.type = "integer", addErrorMessage(res, "type", check2.message, refs);
        break;
      case "min":
        refs.target === "jsonSchema7" ? check2.inclusive ? setResponseValueAndErrors(res, "minimum", check2.value, check2.message, refs) : setResponseValueAndErrors(res, "exclusiveMinimum", check2.value, check2.message, refs) : (check2.inclusive || (res.exclusiveMinimum = !0), setResponseValueAndErrors(res, "minimum", check2.value, check2.message, refs));
        break;
      case "max":
        refs.target === "jsonSchema7" ? check2.inclusive ? setResponseValueAndErrors(res, "maximum", check2.value, check2.message, refs) : setResponseValueAndErrors(res, "exclusiveMaximum", check2.value, check2.message, refs) : (check2.inclusive || (res.exclusiveMaximum = !0), setResponseValueAndErrors(res, "maximum", check2.value, check2.message, refs));
        break;
      case "multipleOf":
        setResponseValueAndErrors(res, "multipleOf", check2.value, check2.message, refs);
        break;
    }
  return res;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/object.js
function parseObjectDef(def2, refs) {
  let forceOptionalIntoNullable = refs.target === "openAi", result = {
    type: "object",
    properties: {}
  }, required3 = [], shape2 = def2.shape();
  for (let propName in shape2) {
    let propDef = shape2[propName];
    if (propDef === void 0 || propDef._def === void 0)
      continue;
    let propOptional = safeIsOptional(propDef);
    propOptional && forceOptionalIntoNullable && (propDef._def.typeName === "ZodOptional" && (propDef = propDef._def.innerType), propDef.isNullable() || (propDef = propDef.nullable()), propOptional = !1);
    let parsedDef = parseDef(propDef._def, {
      ...refs,
      currentPath: [...refs.currentPath, "properties", propName],
      propertyPath: [...refs.currentPath, "properties", propName]
    });
    parsedDef !== void 0 && (result.properties[propName] = parsedDef, propOptional || required3.push(propName));
  }
  required3.length && (result.required = required3);
  let additionalProperties = decideAdditionalProperties(def2, refs);
  return additionalProperties !== void 0 && (result.additionalProperties = additionalProperties), result;
}
function decideAdditionalProperties(def2, refs) {
  if (def2.catchall._def.typeName !== "ZodNever")
    return parseDef(def2.catchall._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalProperties"]
    });
  switch (def2.unknownKeys) {
    case "passthrough":
      return refs.allowedAdditionalProperties;
    case "strict":
      return refs.rejectedAdditionalProperties;
    case "strip":
      return refs.removeAdditionalStrategy === "strict" ? refs.allowedAdditionalProperties : refs.rejectedAdditionalProperties;
  }
}
function safeIsOptional(schema) {
  try {
    return schema.isOptional();
  } catch {
    return !0;
  }
}

// node_modules/zod-to-json-schema/dist/esm/parsers/optional.js
var parseOptionalDef = (def2, refs) => {
  if (refs.currentPath.toString() === refs.propertyPath?.toString())
    return parseDef(def2.innerType._def, refs);
  let innerSchema = parseDef(def2.innerType._def, {
    ...refs,
    currentPath: [...refs.currentPath, "anyOf", "1"]
  });
  return innerSchema ? {
    anyOf: [
      {
        not: parseAnyDef(refs)
      },
      innerSchema
    ]
  } : parseAnyDef(refs);
};

// node_modules/zod-to-json-schema/dist/esm/parsers/pipeline.js
var parsePipelineDef = (def2, refs) => {
  if (refs.pipeStrategy === "input")
    return parseDef(def2.in._def, refs);
  if (refs.pipeStrategy === "output")
    return parseDef(def2.out._def, refs);
  let a = parseDef(def2.in._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", "0"]
  }), b10 = parseDef(def2.out._def, {
    ...refs,
    currentPath: [...refs.currentPath, "allOf", a ? "1" : "0"]
  });
  return {
    allOf: [a, b10].filter((x5) => x5 !== void 0)
  };
};

// node_modules/zod-to-json-schema/dist/esm/parsers/promise.js
function parsePromiseDef(def2, refs) {
  return parseDef(def2.type._def, refs);
}

// node_modules/zod-to-json-schema/dist/esm/parsers/set.js
function parseSetDef(def2, refs) {
  let schema = {
    type: "array",
    uniqueItems: !0,
    items: parseDef(def2.valueType._def, {
      ...refs,
      currentPath: [...refs.currentPath, "items"]
    })
  };
  return def2.minSize && setResponseValueAndErrors(schema, "minItems", def2.minSize.value, def2.minSize.message, refs), def2.maxSize && setResponseValueAndErrors(schema, "maxItems", def2.maxSize.value, def2.maxSize.message, refs), schema;
}

// node_modules/zod-to-json-schema/dist/esm/parsers/tuple.js
function parseTupleDef(def2, refs) {
  return def2.rest ? {
    type: "array",
    minItems: def2.items.length,
    items: def2.items.map((x5, i) => parseDef(x5._def, {
      ...refs,
      currentPath: [...refs.currentPath, "items", `${i}`]
    })).reduce((acc, x5) => x5 === void 0 ? acc : [...acc, x5], []),
    additionalItems: parseDef(def2.rest._def, {
      ...refs,
      currentPath: [...refs.currentPath, "additionalItems"]
    })
  } : {
    type: "array",
    minItems: def2.items.length,
    maxItems: def2.items.length,
    items: def2.items.map((x5, i) => parseDef(x5._def, {
      ...refs,
      currentPath: [...refs.currentPath, "items", `${i}`]
    })).reduce((acc, x5) => x5 === void 0 ? acc : [...acc, x5], [])
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/undefined.js
function parseUndefinedDef(refs) {
  return {
    not: parseAnyDef(refs)
  };
}

// node_modules/zod-to-json-schema/dist/esm/parsers/unknown.js
function parseUnknownDef(refs) {
  return parseAnyDef(refs);
}

// node_modules/zod-to-json-schema/dist/esm/parsers/readonly.js
var parseReadonlyDef = (def2, refs) => parseDef(def2.innerType._def, refs);

// node_modules/zod-to-json-schema/dist/esm/selectParser.js
var selectParser = (def2, typeName, refs) => {
  switch (typeName) {
    case ZodFirstPartyTypeKind.ZodString:
      return parseStringDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodNumber:
      return parseNumberDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodObject:
      return parseObjectDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodBigInt:
      return parseBigintDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodBoolean:
      return parseBooleanDef();
    case ZodFirstPartyTypeKind.ZodDate:
      return parseDateDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodUndefined:
      return parseUndefinedDef(refs);
    case ZodFirstPartyTypeKind.ZodNull:
      return parseNullDef(refs);
    case ZodFirstPartyTypeKind.ZodArray:
      return parseArrayDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodUnion:
    case ZodFirstPartyTypeKind.ZodDiscriminatedUnion:
      return parseUnionDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodIntersection:
      return parseIntersectionDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodTuple:
      return parseTupleDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodRecord:
      return parseRecordDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodLiteral:
      return parseLiteralDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodEnum:
      return parseEnumDef(def2);
    case ZodFirstPartyTypeKind.ZodNativeEnum:
      return parseNativeEnumDef(def2);
    case ZodFirstPartyTypeKind.ZodNullable:
      return parseNullableDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodOptional:
      return parseOptionalDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodMap:
      return parseMapDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodSet:
      return parseSetDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodLazy:
      return () => def2.getter()._def;
    case ZodFirstPartyTypeKind.ZodPromise:
      return parsePromiseDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodNaN:
    case ZodFirstPartyTypeKind.ZodNever:
      return parseNeverDef(refs);
    case ZodFirstPartyTypeKind.ZodEffects:
      return parseEffectsDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodAny:
      return parseAnyDef(refs);
    case ZodFirstPartyTypeKind.ZodUnknown:
      return parseUnknownDef(refs);
    case ZodFirstPartyTypeKind.ZodDefault:
      return parseDefaultDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodBranded:
      return parseBrandedDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodReadonly:
      return parseReadonlyDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodCatch:
      return parseCatchDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodPipeline:
      return parsePipelineDef(def2, refs);
    case ZodFirstPartyTypeKind.ZodFunction:
    case ZodFirstPartyTypeKind.ZodVoid:
    case ZodFirstPartyTypeKind.ZodSymbol:
      return;
    default:
      return /* @__PURE__ */ ((_) => {
      })(typeName);
  }
};

// node_modules/zod-to-json-schema/dist/esm/parseDef.js
function parseDef(def2, refs, forceResolution = !1) {
  let seenItem = refs.seen.get(def2);
  if (refs.override) {
    let overrideResult = refs.override?.(def2, refs, seenItem, forceResolution);
    if (overrideResult !== ignoreOverride)
      return overrideResult;
  }
  if (seenItem && !forceResolution) {
    let seenSchema = get$ref(seenItem, refs);
    if (seenSchema !== void 0)
      return seenSchema;
  }
  let newItem = { def: def2, path: refs.currentPath, jsonSchema: void 0 };
  refs.seen.set(def2, newItem);
  let jsonSchemaOrGetter = selectParser(def2, def2.typeName, refs), jsonSchema = typeof jsonSchemaOrGetter == "function" ? parseDef(jsonSchemaOrGetter(), refs) : jsonSchemaOrGetter;
  if (jsonSchema && addMeta(def2, refs, jsonSchema), refs.postProcess) {
    let postProcessResult = refs.postProcess(jsonSchema, def2, refs);
    return newItem.jsonSchema = jsonSchema, postProcessResult;
  }
  return newItem.jsonSchema = jsonSchema, jsonSchema;
}
var get$ref = (item, refs) => {
  switch (refs.$refStrategy) {
    case "root":
      return { $ref: item.path.join("/") };
    case "relative":
      return { $ref: getRelativePath(refs.currentPath, item.path) };
    case "none":
    case "seen":
      return item.path.length < refs.currentPath.length && item.path.every((value3, index4) => refs.currentPath[index4] === value3) ? (console.warn(`Recursive reference detected at ${refs.currentPath.join("/")}! Defaulting to any`), parseAnyDef(refs)) : refs.$refStrategy === "seen" ? parseAnyDef(refs) : void 0;
  }
}, addMeta = (def2, refs, jsonSchema) => (def2.description && (jsonSchema.description = def2.description, refs.markdownDescription && (jsonSchema.markdownDescription = def2.description)), jsonSchema);

// node_modules/zod-to-json-schema/dist/esm/zodToJsonSchema.js
var zodToJsonSchema = (schema, options) => {
  let refs = getRefs(options), definitions = typeof options == "object" && options.definitions ? Object.entries(options.definitions).reduce((acc, [name3, schema2]) => ({
    ...acc,
    [name3]: parseDef(schema2._def, {
      ...refs,
      currentPath: [...refs.basePath, refs.definitionPath, name3]
    }, !0) ?? parseAnyDef(refs)
  }), {}) : void 0, name2 = typeof options == "string" ? options : options?.nameStrategy === "title" ? void 0 : options?.name, main2 = parseDef(schema._def, name2 === void 0 ? refs : {
    ...refs,
    currentPath: [...refs.basePath, refs.definitionPath, name2]
  }, !1) ?? parseAnyDef(refs), title2 = typeof options == "object" && options.name !== void 0 && options.nameStrategy === "title" ? options.name : void 0;
  title2 !== void 0 && (main2.title = title2), refs.flags.hasReferencedOpenAiAnyType && (definitions || (definitions = {}), definitions[refs.openAiAnyTypeName] || (definitions[refs.openAiAnyTypeName] = {
    // Skipping "object" as no properties can be defined and additionalProperties must be "false"
    type: ["string", "number", "integer", "boolean", "array", "null"],
    items: {
      $ref: refs.$refStrategy === "relative" ? "1" : [
        ...refs.basePath,
        refs.definitionPath,
        refs.openAiAnyTypeName
      ].join("/")
    }
  }));
  let combined = name2 === void 0 ? definitions ? {
    ...main2,
    [refs.definitionPath]: definitions
  } : main2 : {
    $ref: [
      ...refs.$refStrategy === "relative" ? [] : refs.basePath,
      refs.definitionPath,
      name2
    ].join("/"),
    [refs.definitionPath]: {
      ...definitions,
      [name2]: main2
    }
  };
  return refs.target === "jsonSchema7" ? combined.$schema = "http://json-schema.org/draft-07/schema#" : (refs.target === "jsonSchema2019-09" || refs.target === "openAi") && (combined.$schema = "https://json-schema.org/draft/2019-09/schema#"), refs.target === "openAi" && ("anyOf" in combined || "oneOf" in combined || "allOf" in combined || "type" in combined && Array.isArray(combined.type)) && console.warn("Warning: OpenAI may not support schemas with unions as roots! Try wrapping it in an object property."), combined;
};

// node_modules/@modelcontextprotocol/sdk/dist/esm/server/zod-json-schema-compat.js
function mapMiniTarget(t) {
  return !t || t === "jsonSchema7" || t === "draft-7" ? "draft-7" : t === "jsonSchema2019-09" || t === "draft-2020-12" ? "draft-2020-12" : "draft-7";
}
function toJsonSchemaCompat(schema, opts) {
  return isZ4Schema(schema) ? toJSONSchema(schema, {
    target: mapMiniTarget(opts?.target),
    io: opts?.pipeStrategy ?? "input"
  }) : zodToJsonSchema(schema, {
    strictUnions: opts?.strictUnions ?? !0,
    pipeStrategy: opts?.pipeStrategy ?? "input"
  });
}
function getMethodLiteral(schema) {
  let methodSchema = getObjectShape(schema)?.method;
  if (!methodSchema)
    throw new Error("Schema is missing a method literal");
  let value3 = getLiteralValue(methodSchema);
  if (typeof value3 != "string")
    throw new Error("Schema method literal must be a string");
  return value3;
}
function parseWithCompat(schema, data3) {
  let result = safeParse2(schema, data3);
  if (!result.success)
    throw result.error;
  return result.data;
}

// node_modules/@modelcontextprotocol/sdk/dist/esm/shared/protocol.js
var DEFAULT_REQUEST_TIMEOUT_MSEC = 6e4, Protocol = class {
  constructor(_options) {
    this._options = _options, this._requestMessageId = 0, this._requestHandlers = /* @__PURE__ */ new Map(), this._requestHandlerAbortControllers = /* @__PURE__ */ new Map(), this._notificationHandlers = /* @__PURE__ */ new Map(), this._responseHandlers = /* @__PURE__ */ new Map(), this._progressHandlers = /* @__PURE__ */ new Map(), this._timeoutInfo = /* @__PURE__ */ new Map(), this._pendingDebouncedNotifications = /* @__PURE__ */ new Set(), this._taskProgressTokens = /* @__PURE__ */ new Map(), this._requestResolvers = /* @__PURE__ */ new Map(), this.setNotificationHandler(CancelledNotificationSchema, (notification) => {
      this._oncancel(notification);
    }), this.setNotificationHandler(ProgressNotificationSchema, (notification) => {
      this._onprogress(notification);
    }), this.setRequestHandler(
      PingRequestSchema,
      // Automatic pong by default.
      (_request) => ({})
    ), this._taskStore = _options?.taskStore, this._taskMessageQueue = _options?.taskMessageQueue, this._taskStore && (this.setRequestHandler(GetTaskRequestSchema, async (request2, extra) => {
      let task = await this._taskStore.getTask(request2.params.taskId, extra.sessionId);
      if (!task)
        throw new McpError(ErrorCode.InvalidParams, "Failed to retrieve task: Task not found");
      return {
        ...task
      };
    }), this.setRequestHandler(GetTaskPayloadRequestSchema, async (request2, extra) => {
      let handleTaskResult = async () => {
        let taskId = request2.params.taskId;
        if (!await this._taskStore.getTask(taskId, extra.sessionId))
          throw new McpError(ErrorCode.InvalidParams, `Task not found: ${taskId}`);
        if (this._taskMessageQueue) {
          let queuedMessage;
          for (; queuedMessage = await this._taskMessageQueue.dequeue(taskId, extra.sessionId); ) {
            if (queuedMessage.type === "response" || queuedMessage.type === "error") {
              let message = queuedMessage.message, requestId = message.id, resolver = this._requestResolvers.get(requestId);
              if (resolver)
                if (this._requestResolvers.delete(requestId), queuedMessage.type === "response")
                  resolver(message);
                else {
                  let errorMessage = message, error64 = new McpError(errorMessage.error.code, errorMessage.error.message, errorMessage.error.data);
                  resolver(error64);
                }
              else {
                let messageType = queuedMessage.type === "response" ? "Response" : "Error";
                this._onerror(new Error(`${messageType} handler missing for request ${requestId}`));
              }
              continue;
            }
            await this._transport?.send(queuedMessage.message, { relatedRequestId: extra.requestId });
          }
        }
        let task = await this._taskStore.getTask(taskId, extra.sessionId);
        if (!task)
          throw new McpError(ErrorCode.InvalidParams, `Task not found: ${taskId}`);
        if (!isTerminal(task.status))
          return await this._waitForTaskUpdate(taskId, extra.signal, extra.sessionId), await handleTaskResult();
        if (isTerminal(task.status)) {
          let result = await this._taskStore.getTaskResult(taskId, extra.sessionId);
          return this._clearTaskQueue(taskId, extra.sessionId), {
            ...result,
            _meta: {
              ...result._meta,
              [RELATED_TASK_META_KEY]: {
                taskId
              }
            }
          };
        }
        return await handleTaskResult();
      };
      return await handleTaskResult();
    }), this.setRequestHandler(ListTasksRequestSchema, async (request2, extra) => {
      try {
        let { tasks, nextCursor } = await this._taskStore.listTasks(request2.params?.cursor, extra.sessionId);
        return {
          tasks,
          nextCursor,
          _meta: {}
        };
      } catch (error64) {
        throw new McpError(ErrorCode.InvalidParams, `Failed to list tasks: ${error64 instanceof Error ? error64.message : String(error64)}`);
      }
    }), this.setRequestHandler(CancelTaskRequestSchema, async (request2, extra) => {
      try {
        let task = await this._taskStore.getTask(request2.params.taskId, extra.sessionId);
        if (!task)
          throw new McpError(ErrorCode.InvalidParams, `Task not found: ${request2.params.taskId}`);
        if (isTerminal(task.status))
          throw new McpError(ErrorCode.InvalidParams, `Cannot cancel task in terminal status: ${task.status}`);
        await this._taskStore.updateTaskStatus(request2.params.taskId, "cancelled", "Client cancelled task execution.", extra.sessionId), this._clearTaskQueue(request2.params.taskId, extra.sessionId);
        let cancelledTask = await this._taskStore.getTask(request2.params.taskId, extra.sessionId);
        if (!cancelledTask)
          throw new McpError(ErrorCode.InvalidParams, `Task not found after cancellation: ${request2.params.taskId}`);
        return {
          _meta: {},
          ...cancelledTask
        };
      } catch (error64) {
        throw error64 instanceof McpError ? error64 : new McpError(ErrorCode.InvalidRequest, `Failed to cancel task: ${error64 instanceof Error ? error64.message : String(error64)}`);
      }
    }));
  }
  async _oncancel(notification) {
    if (!notification.params.requestId)
      return;
    this._requestHandlerAbortControllers.get(notification.params.requestId)?.abort(notification.params.reason);
  }
  _setupTimeout(messageId, timeout2, maxTotalTimeout, onTimeout, resetTimeoutOnProgress = !1) {
    this._timeoutInfo.set(messageId, {
      timeoutId: setTimeout(onTimeout, timeout2),
      startTime: Date.now(),
      timeout: timeout2,
      maxTotalTimeout,
      resetTimeoutOnProgress,
      onTimeout
    });
  }
  _resetTimeout(messageId) {
    let info2 = this._timeoutInfo.get(messageId);
    if (!info2)
      return !1;
    let totalElapsed = Date.now() - info2.startTime;
    if (info2.maxTotalTimeout && totalElapsed >= info2.maxTotalTimeout)
      throw this._timeoutInfo.delete(messageId), McpError.fromError(ErrorCode.RequestTimeout, "Maximum total timeout exceeded", {
        maxTotalTimeout: info2.maxTotalTimeout,
        totalElapsed
      });
    return clearTimeout(info2.timeoutId), info2.timeoutId = setTimeout(info2.onTimeout, info2.timeout), !0;
  }
  _cleanupTimeout(messageId) {
    let info2 = this._timeoutInfo.get(messageId);
    info2 && (clearTimeout(info2.timeoutId), this._timeoutInfo.delete(messageId));
  }
  /**
   * Attaches to the given transport, starts it, and starts listening for messages.
   *
   * The Protocol object assumes ownership of the Transport, replacing any callbacks that have already been set, and expects that it is the only user of the Transport instance going forward.
   */
  async connect(transport) {
    if (this._transport)
      throw new Error("Already connected to a transport. Call close() before connecting to a new transport, or use a separate Protocol instance per connection.");
    this._transport = transport;
    let _onclose = this.transport?.onclose;
    this._transport.onclose = () => {
      _onclose?.(), this._onclose();
    };
    let _onerror = this.transport?.onerror;
    this._transport.onerror = (error64) => {
      _onerror?.(error64), this._onerror(error64);
    };
    let _onmessage = this._transport?.onmessage;
    this._transport.onmessage = (message, extra) => {
      _onmessage?.(message, extra), isJSONRPCResultResponse(message) || isJSONRPCErrorResponse(message) ? this._onresponse(message) : isJSONRPCRequest(message) ? this._onrequest(message, extra) : isJSONRPCNotification(message) ? this._onnotification(message) : this._onerror(new Error(`Unknown message type: ${JSON.stringify(message)}`));
    }, await this._transport.start();
  }
  _onclose() {
    let responseHandlers = this._responseHandlers;
    this._responseHandlers = /* @__PURE__ */ new Map(), this._progressHandlers.clear(), this._taskProgressTokens.clear(), this._pendingDebouncedNotifications.clear();
    for (let info2 of this._timeoutInfo.values())
      clearTimeout(info2.timeoutId);
    this._timeoutInfo.clear();
    for (let controller of this._requestHandlerAbortControllers.values())
      controller.abort();
    this._requestHandlerAbortControllers.clear();
    let error64 = McpError.fromError(ErrorCode.ConnectionClosed, "Connection closed");
    this._transport = void 0, this.onclose?.();
    for (let handler of responseHandlers.values())
      handler(error64);
  }
  _onerror(error64) {
    this.onerror?.(error64);
  }
  _onnotification(notification) {
    let handler = this._notificationHandlers.get(notification.method) ?? this.fallbackNotificationHandler;
    handler !== void 0 && Promise.resolve().then(() => handler(notification)).catch((error64) => this._onerror(new Error(`Uncaught error in notification handler: ${error64}`)));
  }
  _onrequest(request2, extra) {
    let handler = this._requestHandlers.get(request2.method) ?? this.fallbackRequestHandler, capturedTransport = this._transport, relatedTaskId = request2.params?._meta?.[RELATED_TASK_META_KEY]?.taskId, sessionId = capturedTransport?.sessionId, store = this._taskStore, relatedTaskFound = !0, relatedTaskLookup;
    if (relatedTaskId && store && this._taskMessageQueue && sessionId !== void 0 && (relatedTaskFound = !1, relatedTaskLookup = (async () => {
      if (!await store.getTask(relatedTaskId, sessionId))
        throw new McpError(ErrorCode.InvalidParams, `Task not found: ${relatedTaskId}`);
      relatedTaskFound = !0;
    })()), handler === void 0) {
      let errorResponse = {
        jsonrpc: "2.0",
        id: request2.id,
        error: {
          code: ErrorCode.MethodNotFound,
          message: "Method not found"
        }
      };
      if (relatedTaskId && relatedTaskLookup) {
        let queuedError = { type: "error", message: errorResponse, timestamp: Date.now() };
        relatedTaskLookup.then(() => this._enqueueTaskMessage(relatedTaskId, queuedError, sessionId), () => capturedTransport?.send(errorResponse)).catch((error64) => this._onerror(new Error(`Failed to send an error response: ${error64}`)));
      } else relatedTaskId && this._taskMessageQueue ? this._enqueueTaskMessage(relatedTaskId, {
        type: "error",
        message: errorResponse,
        timestamp: Date.now()
      }, capturedTransport?.sessionId).catch((error64) => this._onerror(new Error(`Failed to enqueue error response: ${error64}`))) : capturedTransport?.send(errorResponse).catch((error64) => this._onerror(new Error(`Failed to send an error response: ${error64}`)));
      return;
    }
    let abortController = new AbortController();
    this._requestHandlerAbortControllers.set(request2.id, abortController);
    let taskCreationParams = isTaskAugmentedRequestParams(request2.params) ? request2.params.task : void 0, taskStore = this._taskStore ? this.requestTaskStore(request2, capturedTransport?.sessionId) : void 0, fullExtra = {
      signal: abortController.signal,
      sessionId: capturedTransport?.sessionId,
      _meta: request2.params?._meta,
      sendNotification: async (notification) => {
        if (abortController.signal.aborted)
          return;
        let notificationOptions = { relatedRequestId: request2.id };
        relatedTaskId && (notificationOptions.relatedTask = { taskId: relatedTaskId }), await this.notification(notification, notificationOptions);
      },
      sendRequest: async (r, resultSchema, options) => {
        if (abortController.signal.aborted)
          throw new McpError(ErrorCode.ConnectionClosed, "Request was cancelled");
        let requestOptions = { ...options, relatedRequestId: request2.id };
        relatedTaskId && !requestOptions.relatedTask && (requestOptions.relatedTask = { taskId: relatedTaskId });
        let effectiveTaskId = requestOptions.relatedTask?.taskId ?? relatedTaskId;
        return effectiveTaskId && taskStore && await taskStore.updateTaskStatus(effectiveTaskId, "input_required"), await this.request(r, resultSchema, requestOptions);
      },
      authInfo: extra?.authInfo,
      requestId: request2.id,
      requestInfo: extra?.requestInfo,
      taskId: relatedTaskId,
      taskStore,
      taskRequestedTtl: taskCreationParams?.ttl,
      closeSSEStream: extra?.closeSSEStream,
      closeStandaloneSSEStream: extra?.closeStandaloneSSEStream
    };
    (relatedTaskLookup ?? Promise.resolve()).then(() => {
      if (relatedTaskLookup && abortController.signal.aborted)
        throw new McpError(ErrorCode.ConnectionClosed, "Request was cancelled");
      taskCreationParams && this.assertTaskHandlerCapability(request2.method);
    }).then(() => handler(request2, fullExtra)).then(async (result) => {
      if (abortController.signal.aborted)
        return;
      let response = {
        result,
        jsonrpc: "2.0",
        id: request2.id
      };
      relatedTaskId && this._taskMessageQueue ? await this._enqueueTaskMessage(relatedTaskId, {
        type: "response",
        message: response,
        timestamp: Date.now()
      }, capturedTransport?.sessionId) : await capturedTransport?.send(response);
    }, async (error64) => {
      if (abortController.signal.aborted)
        return;
      let errorResponse = {
        jsonrpc: "2.0",
        id: request2.id,
        error: {
          code: Number.isSafeInteger(error64.code) ? error64.code : ErrorCode.InternalError,
          message: error64.message ?? "Internal error",
          ...error64.data !== void 0 && { data: error64.data }
        }
      };
      relatedTaskId && this._taskMessageQueue && relatedTaskFound ? await this._enqueueTaskMessage(relatedTaskId, {
        type: "error",
        message: errorResponse,
        timestamp: Date.now()
      }, capturedTransport?.sessionId) : await capturedTransport?.send(errorResponse);
    }).catch((error64) => this._onerror(new Error(`Failed to send response: ${error64}`))).finally(() => {
      this._requestHandlerAbortControllers.get(request2.id) === abortController && this._requestHandlerAbortControllers.delete(request2.id);
    });
  }
  _onprogress(notification) {
    let { progressToken, ...params2 } = notification.params, messageId = Number(progressToken), handler = this._progressHandlers.get(messageId);
    if (!handler) {
      this._onerror(new Error(`Received a progress notification for an unknown token: ${JSON.stringify(notification)}`));
      return;
    }
    let responseHandler = this._responseHandlers.get(messageId), timeoutInfo = this._timeoutInfo.get(messageId);
    if (timeoutInfo && responseHandler && timeoutInfo.resetTimeoutOnProgress)
      try {
        this._resetTimeout(messageId);
      } catch (error64) {
        this._responseHandlers.delete(messageId), this._progressHandlers.delete(messageId), this._cleanupTimeout(messageId), responseHandler(error64);
        return;
      }
    handler(params2);
  }
  _onresponse(response) {
    let messageId = Number(response.id), resolver = this._requestResolvers.get(messageId);
    if (resolver) {
      if (this._requestResolvers.delete(messageId), isJSONRPCResultResponse(response))
        resolver(response);
      else {
        let error64 = new McpError(response.error.code, response.error.message, response.error.data);
        resolver(error64);
      }
      return;
    }
    let handler = this._responseHandlers.get(messageId);
    if (handler === void 0) {
      this._onerror(new Error(`Received a response for an unknown message ID: ${JSON.stringify(response)}`));
      return;
    }
    this._responseHandlers.delete(messageId), this._cleanupTimeout(messageId);
    let isTaskResponse = !1;
    if (isJSONRPCResultResponse(response) && response.result && typeof response.result == "object") {
      let result = response.result;
      if (result.task && typeof result.task == "object") {
        let task = result.task;
        typeof task.taskId == "string" && (isTaskResponse = !0, this._taskProgressTokens.set(task.taskId, messageId));
      }
    }
    if (isTaskResponse || this._progressHandlers.delete(messageId), isJSONRPCResultResponse(response))
      handler(response);
    else {
      let error64 = McpError.fromError(response.error.code, response.error.message, response.error.data);
      handler(error64);
    }
  }
  get transport() {
    return this._transport;
  }
  /**
   * Closes the connection.
   */
  async close() {
    await this._transport?.close();
  }
  /**
   * Sends a request and returns an AsyncGenerator that yields response messages.
   * The generator is guaranteed to end with either a 'result' or 'error' message.
   *
   * @example
   * ```typescript
   * const stream = protocol.requestStream(request, resultSchema, options);
   * for await (const message of stream) {
   *   switch (message.type) {
   *     case 'taskCreated':
   *       console.log('Task created:', message.task.taskId);
   *       break;
   *     case 'taskStatus':
   *       console.log('Task status:', message.task.status);
   *       break;
   *     case 'result':
   *       console.log('Final result:', message.result);
   *       break;
   *     case 'error':
   *       console.error('Error:', message.error);
   *       break;
   *   }
   * }
   * ```
   *
   * @experimental Use `client.experimental.tasks.requestStream()` to access this method.
   */
  async *requestStream(request2, resultSchema, options) {
    let { task } = options ?? {};
    if (!task) {
      try {
        yield { type: "result", result: await this.request(request2, resultSchema, options) };
      } catch (error64) {
        yield {
          type: "error",
          error: error64 instanceof McpError ? error64 : new McpError(ErrorCode.InternalError, String(error64))
        };
      }
      return;
    }
    let taskId;
    try {
      let createResult = await this.request(request2, CreateTaskResultSchema, options);
      if (createResult.task)
        taskId = createResult.task.taskId, yield { type: "taskCreated", task: createResult.task };
      else
        throw new McpError(ErrorCode.InternalError, "Task creation did not return a task");
      for (; ; ) {
        let task2 = await this.getTask({ taskId }, options);
        if (yield { type: "taskStatus", task: task2 }, isTerminal(task2.status)) {
          task2.status === "completed" ? yield { type: "result", result: await this.getTaskResult({ taskId }, resultSchema, options) } : task2.status === "failed" ? yield {
            type: "error",
            error: new McpError(ErrorCode.InternalError, `Task ${taskId} failed`)
          } : task2.status === "cancelled" && (yield {
            type: "error",
            error: new McpError(ErrorCode.InternalError, `Task ${taskId} was cancelled`)
          });
          return;
        }
        if (task2.status === "input_required") {
          yield { type: "result", result: await this.getTaskResult({ taskId }, resultSchema, options) };
          return;
        }
        let pollInterval = task2.pollInterval ?? this._options?.defaultTaskPollInterval ?? 1e3;
        await new Promise((resolve9) => setTimeout(resolve9, pollInterval)), options?.signal?.throwIfAborted();
      }
    } catch (error64) {
      yield {
        type: "error",
        error: error64 instanceof McpError ? error64 : new McpError(ErrorCode.InternalError, String(error64))
      };
    }
  }
  /**
   * Sends a request and waits for a response.
   *
   * Do not use this method to emit notifications! Use notification() instead.
   */
  request(request2, resultSchema, options) {
    let { relatedRequestId, resumptionToken, onresumptiontoken, task, relatedTask } = options ?? {};
    return new Promise((resolve9, reject) => {
      let earlyReject = (error64) => {
        reject(error64);
      };
      if (!this._transport) {
        earlyReject(new Error("Not connected"));
        return;
      }
      if (this._options?.enforceStrictCapabilities === !0)
        try {
          this.assertCapabilityForMethod(request2.method), task && this.assertTaskCapability(request2.method);
        } catch (e) {
          earlyReject(e);
          return;
        }
      options?.signal?.throwIfAborted();
      let messageId = this._requestMessageId++, jsonrpcRequest = {
        ...request2,
        jsonrpc: "2.0",
        id: messageId
      };
      options?.onprogress && (this._progressHandlers.set(messageId, options.onprogress), jsonrpcRequest.params = {
        ...request2.params,
        _meta: {
          ...request2.params?._meta || {},
          progressToken: messageId
        }
      }), task && (jsonrpcRequest.params = {
        ...jsonrpcRequest.params,
        task
      }), relatedTask && (jsonrpcRequest.params = {
        ...jsonrpcRequest.params,
        _meta: {
          ...jsonrpcRequest.params?._meta || {},
          [RELATED_TASK_META_KEY]: relatedTask
        }
      });
      let cancel = (reason3) => {
        this._responseHandlers.delete(messageId), this._progressHandlers.delete(messageId), this._cleanupTimeout(messageId), this._transport?.send({
          jsonrpc: "2.0",
          method: "notifications/cancelled",
          params: {
            requestId: messageId,
            reason: String(reason3)
          }
        }, { relatedRequestId, resumptionToken, onresumptiontoken }).catch((error65) => this._onerror(new Error(`Failed to send cancellation: ${error65}`)));
        let error64 = reason3 instanceof McpError ? reason3 : new McpError(ErrorCode.RequestTimeout, String(reason3));
        reject(error64);
      };
      this._responseHandlers.set(messageId, (response) => {
        if (!options?.signal?.aborted) {
          if (response instanceof Error)
            return reject(response);
          try {
            let parseResult = safeParse2(resultSchema, response.result);
            parseResult.success ? resolve9(parseResult.data) : reject(parseResult.error);
          } catch (error64) {
            reject(error64);
          }
        }
      }), options?.signal?.addEventListener("abort", () => {
        cancel(options?.signal?.reason);
      });
      let timeout2 = options?.timeout ?? DEFAULT_REQUEST_TIMEOUT_MSEC, timeoutHandler = () => cancel(McpError.fromError(ErrorCode.RequestTimeout, "Request timed out", { timeout: timeout2 }));
      this._setupTimeout(messageId, timeout2, options?.maxTotalTimeout, timeoutHandler, options?.resetTimeoutOnProgress ?? !1);
      let relatedTaskId = relatedTask?.taskId;
      if (relatedTaskId) {
        let responseResolver = (response) => {
          let handler = this._responseHandlers.get(messageId);
          handler ? handler(response) : this._onerror(new Error(`Response handler missing for side-channeled request ${messageId}`));
        };
        this._requestResolvers.set(messageId, responseResolver), this._enqueueTaskMessage(relatedTaskId, {
          type: "request",
          message: jsonrpcRequest,
          timestamp: Date.now()
        }).catch((error64) => {
          this._cleanupTimeout(messageId), reject(error64);
        });
      } else
        this._transport.send(jsonrpcRequest, { relatedRequestId, resumptionToken, onresumptiontoken }).catch((error64) => {
          this._cleanupTimeout(messageId), reject(error64);
        });
    });
  }
  /**
   * Gets the current status of a task.
   *
   * @experimental Use `client.experimental.tasks.getTask()` to access this method.
   */
  async getTask(params2, options) {
    return this.request({ method: "tasks/get", params: params2 }, GetTaskResultSchema, options);
  }
  /**
   * Retrieves the result of a completed task.
   *
   * @experimental Use `client.experimental.tasks.getTaskResult()` to access this method.
   */
  async getTaskResult(params2, resultSchema, options) {
    return this.request({ method: "tasks/result", params: params2 }, resultSchema, options);
  }
  /**
   * Lists tasks, optionally starting from a pagination cursor.
   *
   * @experimental Use `client.experimental.tasks.listTasks()` to access this method.
   */
  async listTasks(params2, options) {
    return this.request({ method: "tasks/list", params: params2 }, ListTasksResultSchema, options);
  }
  /**
   * Cancels a specific task.
   *
   * @experimental Use `client.experimental.tasks.cancelTask()` to access this method.
   */
  async cancelTask(params2, options) {
    return this.request({ method: "tasks/cancel", params: params2 }, CancelTaskResultSchema, options);
  }
  /**
   * Emits a notification, which is a one-way message that does not expect a response.
   */
  async notification(notification, options) {
    if (!this._transport)
      throw new Error("Not connected");
    this.assertNotificationCapability(notification.method);
    let relatedTaskId = options?.relatedTask?.taskId;
    if (relatedTaskId) {
      let jsonrpcNotification2 = {
        ...notification,
        jsonrpc: "2.0",
        params: {
          ...notification.params,
          _meta: {
            ...notification.params?._meta || {},
            [RELATED_TASK_META_KEY]: options.relatedTask
          }
        }
      };
      await this._enqueueTaskMessage(relatedTaskId, {
        type: "notification",
        message: jsonrpcNotification2,
        timestamp: Date.now()
      });
      return;
    }
    if ((this._options?.debouncedNotificationMethods ?? []).includes(notification.method) && !notification.params && !options?.relatedRequestId && !options?.relatedTask) {
      if (this._pendingDebouncedNotifications.has(notification.method))
        return;
      this._pendingDebouncedNotifications.add(notification.method), Promise.resolve().then(() => {
        if (this._pendingDebouncedNotifications.delete(notification.method), !this._transport)
          return;
        let jsonrpcNotification2 = {
          ...notification,
          jsonrpc: "2.0"
        };
        options?.relatedTask && (jsonrpcNotification2 = {
          ...jsonrpcNotification2,
          params: {
            ...jsonrpcNotification2.params,
            _meta: {
              ...jsonrpcNotification2.params?._meta || {},
              [RELATED_TASK_META_KEY]: options.relatedTask
            }
          }
        }), this._transport?.send(jsonrpcNotification2, options).catch((error64) => this._onerror(error64));
      });
      return;
    }
    let jsonrpcNotification = {
      ...notification,
      jsonrpc: "2.0"
    };
    options?.relatedTask && (jsonrpcNotification = {
      ...jsonrpcNotification,
      params: {
        ...jsonrpcNotification.params,
        _meta: {
          ...jsonrpcNotification.params?._meta || {},
          [RELATED_TASK_META_KEY]: options.relatedTask
        }
      }
    }), await this._transport.send(jsonrpcNotification, options);
  }
  /**
   * Registers a handler to invoke when this protocol object receives a request with the given method.
   *
   * Note that this will replace any previous request handler for the same method.
   */
  setRequestHandler(requestSchema, handler) {
    let method2 = getMethodLiteral(requestSchema);
    this.assertRequestHandlerCapability(method2), this._requestHandlers.set(method2, (request2, extra) => {
      let parsed = parseWithCompat(requestSchema, request2);
      return Promise.resolve(handler(parsed, extra));
    });
  }
  /**
   * Removes the request handler for the given method.
   */
  removeRequestHandler(method2) {
    this._requestHandlers.delete(method2);
  }
  /**
   * Asserts that a request handler has not already been set for the given method, in preparation for a new one being automatically installed.
   */
  assertCanSetRequestHandler(method2) {
    if (this._requestHandlers.has(method2))
      throw new Error(`A request handler for ${method2} already exists, which would be overridden`);
  }
  /**
   * Registers a handler to invoke when this protocol object receives a notification with the given method.
   *
   * Note that this will replace any previous notification handler for the same method.
   */
  setNotificationHandler(notificationSchema, handler) {
    let method2 = getMethodLiteral(notificationSchema);
    this._notificationHandlers.set(method2, (notification) => {
      let parsed = parseWithCompat(notificationSchema, notification);
      return Promise.resolve(handler(parsed));
    });
  }
  /**
   * Removes the notification handler for the given method.
   */
  removeNotificationHandler(method2) {
    this._notificationHandlers.delete(method2);
  }
  /**
   * Cleans up the progress handler associated with a task.
   * This should be called when a task reaches a terminal status.
   */
  _cleanupTaskProgressHandler(taskId) {
    let progressToken = this._taskProgressTokens.get(taskId);
    progressToken !== void 0 && (this._progressHandlers.delete(progressToken), this._taskProgressTokens.delete(taskId));
  }
  /**
   * Enqueues a task-related message for side-channel delivery via tasks/result.
   * @param taskId The task ID to associate the message with
   * @param message The message to enqueue
   * @param sessionId Optional session ID for binding the operation to a specific session
   * @throws Error if taskStore is not configured or if enqueue fails (e.g., queue overflow)
   *
   * Note: If enqueue fails, it's the TaskMessageQueue implementation's responsibility to handle
   * the error appropriately (e.g., by failing the task, logging, etc.). The Protocol layer
   * simply propagates the error.
   */
  async _enqueueTaskMessage(taskId, message, sessionId) {
    if (!this._taskStore || !this._taskMessageQueue)
      throw new Error("Cannot enqueue task message: taskStore and taskMessageQueue are not configured");
    let maxQueueSize = this._options?.maxTaskQueueSize;
    await this._taskMessageQueue.enqueue(taskId, message, sessionId ?? this._transport?.sessionId, maxQueueSize);
  }
  /**
   * Clears the message queue for a task and rejects any pending request resolvers.
   * @param taskId The task ID whose queue should be cleared
   * @param sessionId Optional session ID for binding the operation to a specific session
   */
  async _clearTaskQueue(taskId, sessionId) {
    if (this._taskMessageQueue) {
      let messages = await this._taskMessageQueue.dequeueAll(taskId, sessionId);
      for (let message of messages)
        if (message.type === "request" && isJSONRPCRequest(message.message)) {
          let requestId = message.message.id, resolver = this._requestResolvers.get(requestId);
          resolver ? (resolver(new McpError(ErrorCode.InternalError, "Task cancelled or completed")), this._requestResolvers.delete(requestId)) : this._onerror(new Error(`Resolver missing for request ${requestId} during task ${taskId} cleanup`));
        }
    }
  }
  /**
   * Waits for a task update (new messages or status change) with abort signal support.
   * Uses polling to check for updates at the task's configured poll interval.
   * @param taskId The task ID to wait for
   * @param signal Abort signal to cancel the wait
   * @param sessionId Session of the request that waits, passed to the task store
   * @returns Promise that resolves when an update occurs or rejects if aborted
   */
  async _waitForTaskUpdate(taskId, signal, sessionId) {
    let interval3 = this._options?.defaultTaskPollInterval ?? 1e3;
    try {
      let task = await this._taskStore?.getTask(taskId, sessionId);
      task?.pollInterval && (interval3 = task.pollInterval);
    } catch {
    }
    return new Promise((resolve9, reject) => {
      if (signal.aborted) {
        reject(new McpError(ErrorCode.InvalidRequest, "Request cancelled"));
        return;
      }
      let timeoutId = setTimeout(resolve9, interval3);
      signal.addEventListener("abort", () => {
        clearTimeout(timeoutId), reject(new McpError(ErrorCode.InvalidRequest, "Request cancelled"));
      }, { once: !0 });
    });
  }
  requestTaskStore(request2, sessionId) {
    let taskStore = this._taskStore;
    if (!taskStore)
      throw new Error("No task store configured");
    return {
      createTask: async (taskParams) => {
        if (!request2)
          throw new Error("No request provided");
        return await taskStore.createTask(taskParams, request2.id, {
          method: request2.method,
          params: request2.params
        }, sessionId);
      },
      getTask: async (taskId) => {
        let task = await taskStore.getTask(taskId, sessionId);
        if (!task)
          throw new McpError(ErrorCode.InvalidParams, "Failed to retrieve task: Task not found");
        return task;
      },
      storeTaskResult: async (taskId, status, result) => {
        await taskStore.storeTaskResult(taskId, status, result, sessionId);
        let task = await taskStore.getTask(taskId, sessionId);
        if (task) {
          let notification = TaskStatusNotificationSchema.parse({
            method: "notifications/tasks/status",
            params: task
          });
          await this.notification(notification), isTerminal(task.status) && this._cleanupTaskProgressHandler(taskId);
        }
      },
      getTaskResult: (taskId) => taskStore.getTaskResult(taskId, sessionId),
      updateTaskStatus: async (taskId, status, statusMessage) => {
        let task = await taskStore.getTask(taskId, sessionId);
        if (!task)
          throw new McpError(ErrorCode.InvalidParams, `Task "${taskId}" not found - it may have been cleaned up`);
        if (isTerminal(task.status))
          throw new McpError(ErrorCode.InvalidParams, `Cannot update task "${taskId}" from terminal status "${task.status}" to "${status}". Terminal states (completed, failed, cancelled) cannot transition to other states.`);
        await taskStore.updateTaskStatus(taskId, status, statusMessage, sessionId);
        let updatedTask = await taskStore.getTask(taskId, sessionId);
        if (updatedTask) {
          let notification = TaskStatusNotificationSchema.parse({
            method: "notifications/tasks/status",
            params: updatedTask
          });
          await this.notification(notification), isTerminal(updatedTask.status) && this._cleanupTaskProgressHandler(taskId);
        }
      },
      listTasks: (cursor3) => taskStore.listTasks(cursor3, sessionId)
    };
  }
};
function isPlainObject2(value3) {
  return value3 !== null && typeof value3 == "object" && !Array.isArray(value3);
}
function mergeCapabilities(base, additional) {
  let result = { ...base };
  for (let key2 in additional) {
    let k = key2, addValue = additional[k];
    if (addValue === void 0)
      continue;
    let baseValue = result[k];
    isPlainObject2(baseValue) && isPlainObject2(addValue) ? result[k] = { ...baseValue, ...addValue } : result[k] = addValue;
  }
  return result;
}

// node_modules/@modelcontextprotocol/sdk/dist/esm/validation/ajv-provider.js
var import_ajv = __toESM(require_ajv(), 1), import_ajv_formats = __toESM(require_dist(), 1);
function createDefaultAjvInstance() {
  let ajv = new import_ajv.default({
    strict: !1,
    validateFormats: !0,
    validateSchema: !1,
    allErrors: !0
  });
  return (0, import_ajv_formats.default)(ajv), ajv;
}
var AjvJsonSchemaValidator = class {
  /**
   * Create an AJV validator
   *
   * @param ajv - Optional pre-configured AJV instance. If not provided, a default instance will be created.
   *
   * @example
   * ```typescript
   * // Use default configuration (recommended for most cases)
   * import { AjvJsonSchemaValidator } from '@modelcontextprotocol/sdk/validation/ajv';
   * const validator = new AjvJsonSchemaValidator();
   *
   * // Or provide custom AJV instance for advanced configuration
   * import { Ajv } from 'ajv';
   * import addFormats from 'ajv-formats';
   *
   * const ajv = new Ajv({ validateFormats: true });
   * addFormats(ajv);
   * const validator = new AjvJsonSchemaValidator(ajv);
   * ```
   */
  constructor(ajv) {
    this._ajv = ajv ?? createDefaultAjvInstance();
  }
  /**
   * Create a validator for the given JSON Schema
   *
   * The validator is compiled once and can be reused multiple times.
   * If the schema has an $id, it will be cached by AJV automatically.
   *
   * @param schema - Standard JSON Schema object
   * @returns A validator function that validates input data
   */
  getValidator(schema) {
    let ajvValidator = "$id" in schema && typeof schema.$id == "string" ? this._ajv.getSchema(schema.$id) ?? this._ajv.compile(schema) : this._ajv.compile(schema);
    return (input2) => ajvValidator(input2) ? {
      valid: !0,
      data: input2,
      errorMessage: void 0
    } : {
      valid: !1,
      data: void 0,
      errorMessage: this._ajv.errorsText(ajvValidator.errors)
    };
  }
};

// node_modules/@modelcontextprotocol/sdk/dist/esm/experimental/tasks/server.js
var ExperimentalServerTasks = class {
  constructor(_server) {
    this._server = _server;
  }
  /**
   * Sends a request and returns an AsyncGenerator that yields response messages.
   * The generator is guaranteed to end with either a 'result' or 'error' message.
   *
   * This method provides streaming access to request processing, allowing you to
   * observe intermediate task status updates for task-augmented requests.
   *
   * @param request - The request to send
   * @param resultSchema - Zod schema for validating the result
   * @param options - Optional request options (timeout, signal, task creation params, etc.)
   * @returns AsyncGenerator that yields ResponseMessage objects
   *
   * @experimental
   */
  requestStream(request2, resultSchema, options) {
    return this._server.requestStream(request2, resultSchema, options);
  }
  /**
   * Sends a sampling request and returns an AsyncGenerator that yields response messages.
   * The generator is guaranteed to end with either a 'result' or 'error' message.
   *
   * For task-augmented requests, yields 'taskCreated' and 'taskStatus' messages
   * before the final result.
   *
   * @example
   * ```typescript
   * const stream = server.experimental.tasks.createMessageStream({
   *     messages: [{ role: 'user', content: { type: 'text', text: 'Hello' } }],
   *     maxTokens: 100
   * }, {
   *     onprogress: (progress) => {
   *         // Handle streaming tokens via progress notifications
   *         console.log('Progress:', progress.message);
   *     }
   * });
   *
   * for await (const message of stream) {
   *     switch (message.type) {
   *         case 'taskCreated':
   *             console.log('Task created:', message.task.taskId);
   *             break;
   *         case 'taskStatus':
   *             console.log('Task status:', message.task.status);
   *             break;
   *         case 'result':
   *             console.log('Final result:', message.result);
   *             break;
   *         case 'error':
   *             console.error('Error:', message.error);
   *             break;
   *     }
   * }
   * ```
   *
   * @param params - The sampling request parameters
   * @param options - Optional request options (timeout, signal, task creation params, onprogress, etc.)
   * @returns AsyncGenerator that yields ResponseMessage objects
   *
   * @experimental
   */
  createMessageStream(params2, options) {
    let clientCapabilities = this._server.getClientCapabilities();
    if ((params2.tools || params2.toolChoice) && !clientCapabilities?.sampling?.tools)
      throw new Error("Client does not support sampling tools capability.");
    if (params2.messages.length > 0) {
      let lastMessage = params2.messages[params2.messages.length - 1], lastContent = Array.isArray(lastMessage.content) ? lastMessage.content : [lastMessage.content], hasToolResults = lastContent.some((c) => c.type === "tool_result"), previousMessage = params2.messages.length > 1 ? params2.messages[params2.messages.length - 2] : void 0, previousContent = previousMessage ? Array.isArray(previousMessage.content) ? previousMessage.content : [previousMessage.content] : [], hasPreviousToolUse = previousContent.some((c) => c.type === "tool_use");
      if (hasToolResults) {
        if (lastContent.some((c) => c.type !== "tool_result"))
          throw new Error("The last message must contain only tool_result content if any is present");
        if (!hasPreviousToolUse)
          throw new Error("tool_result blocks are not matching any tool_use from the previous message");
      }
      if (hasPreviousToolUse) {
        let toolUseIds = new Set(previousContent.filter((c) => c.type === "tool_use").map((c) => c.id)), toolResultIds = new Set(lastContent.filter((c) => c.type === "tool_result").map((c) => c.toolUseId));
        if (toolUseIds.size !== toolResultIds.size || ![...toolUseIds].every((id3) => toolResultIds.has(id3)))
          throw new Error("ids of tool_result blocks and tool_use blocks from previous message do not match");
      }
    }
    return this.requestStream({
      method: "sampling/createMessage",
      params: params2
    }, CreateMessageResultSchema, options);
  }
  /**
   * Sends an elicitation request and returns an AsyncGenerator that yields response messages.
   * The generator is guaranteed to end with either a 'result' or 'error' message.
   *
   * For task-augmented requests (especially URL-based elicitation), yields 'taskCreated'
   * and 'taskStatus' messages before the final result.
   *
   * @example
   * ```typescript
   * const stream = server.experimental.tasks.elicitInputStream({
   *     mode: 'url',
   *     message: 'Please authenticate',
   *     elicitationId: 'auth-123',
   *     url: 'https://example.com/auth'
   * }, {
   *     task: { ttl: 300000 } // Task-augmented for long-running auth flow
   * });
   *
   * for await (const message of stream) {
   *     switch (message.type) {
   *         case 'taskCreated':
   *             console.log('Task created:', message.task.taskId);
   *             break;
   *         case 'taskStatus':
   *             console.log('Task status:', message.task.status);
   *             break;
   *         case 'result':
   *             console.log('User action:', message.result.action);
   *             break;
   *         case 'error':
   *             console.error('Error:', message.error);
   *             break;
   *     }
   * }
   * ```
   *
   * @param params - The elicitation request parameters
   * @param options - Optional request options (timeout, signal, task creation params, etc.)
   * @returns AsyncGenerator that yields ResponseMessage objects
   *
   * @experimental
   */
  elicitInputStream(params2, options) {
    let clientCapabilities = this._server.getClientCapabilities(), mode = params2.mode ?? "form";
    switch (mode) {
      case "url": {
        if (!clientCapabilities?.elicitation?.url)
          throw new Error("Client does not support url elicitation.");
        break;
      }
      case "form": {
        if (!clientCapabilities?.elicitation?.form)
          throw new Error("Client does not support form elicitation.");
        break;
      }
    }
    let normalizedParams = mode === "form" && params2.mode === void 0 ? { ...params2, mode: "form" } : params2;
    return this.requestStream({
      method: "elicitation/create",
      params: normalizedParams
    }, ElicitResultSchema, options);
  }
  /**
   * Gets the current status of a task.
   *
   * @param taskId - The task identifier
   * @param options - Optional request options
   * @returns The task status
   *
   * @experimental
   */
  async getTask(taskId, options) {
    return this._server.getTask({ taskId }, options);
  }
  /**
   * Retrieves the result of a completed task.
   *
   * @param taskId - The task identifier
   * @param resultSchema - Zod schema for validating the result
   * @param options - Optional request options
   * @returns The task result
   *
   * @experimental
   */
  async getTaskResult(taskId, resultSchema, options) {
    return this._server.getTaskResult({ taskId }, resultSchema, options);
  }
  /**
   * Lists tasks with optional pagination.
   *
   * @param cursor - Optional pagination cursor
   * @param options - Optional request options
   * @returns List of tasks with optional next cursor
   *
   * @experimental
   */
  async listTasks(cursor3, options) {
    return this._server.listTasks(cursor3 ? { cursor: cursor3 } : void 0, options);
  }
  /**
   * Cancels a running task.
   *
   * @param taskId - The task identifier
   * @param options - Optional request options
   *
   * @experimental
   */
  async cancelTask(taskId, options) {
    return this._server.cancelTask({ taskId }, options);
  }
};

// node_modules/@modelcontextprotocol/sdk/dist/esm/experimental/tasks/helpers.js
function assertToolsCallTaskCapability(requests, method2, entityName) {
  if (!requests)
    throw new Error(`${entityName} does not support task creation (required for ${method2})`);
  switch (method2) {
    case "tools/call":
      if (!requests.tools?.call)
        throw new Error(`${entityName} does not support task creation for tools/call (required for ${method2})`);
      break;
    default:
      break;
  }
}
function assertClientRequestTaskCapability(requests, method2, entityName) {
  if (!requests)
    throw new Error(`${entityName} does not support task creation (required for ${method2})`);
  switch (method2) {
    case "sampling/createMessage":
      if (!requests.sampling?.createMessage)
        throw new Error(`${entityName} does not support task creation for sampling/createMessage (required for ${method2})`);
      break;
    case "elicitation/create":
      if (!requests.elicitation?.create)
        throw new Error(`${entityName} does not support task creation for elicitation/create (required for ${method2})`);
      break;
    default:
      break;
  }
}

// node_modules/@modelcontextprotocol/sdk/dist/esm/server/index.js
var Server = class extends Protocol {
  /**
   * Initializes this server with the given name and version information.
   */
  constructor(_serverInfo, options) {
    super(options), this._serverInfo = _serverInfo, this._loggingLevels = /* @__PURE__ */ new Map(), this.LOG_LEVEL_SEVERITY = new Map(LoggingLevelSchema.options.map((level, index4) => [level, index4])), this.isMessageIgnored = (level, sessionId) => {
      let currentLevel = this._loggingLevels.get(sessionId);
      return currentLevel ? this.LOG_LEVEL_SEVERITY.get(level) < this.LOG_LEVEL_SEVERITY.get(currentLevel) : !1;
    }, this._capabilities = options?.capabilities ?? {}, this._instructions = options?.instructions, this._jsonSchemaValidator = options?.jsonSchemaValidator ?? new AjvJsonSchemaValidator(), this.setRequestHandler(InitializeRequestSchema, (request2) => this._oninitialize(request2)), this.setNotificationHandler(InitializedNotificationSchema, () => this.oninitialized?.()), this._capabilities.logging && this.setRequestHandler(SetLevelRequestSchema, async (request2, extra) => {
      let transportSessionId = extra.sessionId || extra.requestInfo?.headers["mcp-session-id"] || void 0, { level } = request2.params, parseResult = LoggingLevelSchema.safeParse(level);
      return parseResult.success && this._loggingLevels.set(transportSessionId, parseResult.data), {};
    });
  }
  /**
   * Access experimental features.
   *
   * WARNING: These APIs are experimental and may change without notice.
   *
   * @experimental
   */
  get experimental() {
    return this._experimental || (this._experimental = {
      tasks: new ExperimentalServerTasks(this)
    }), this._experimental;
  }
  /**
   * Registers new capabilities. This can only be called before connecting to a transport.
   *
   * The new capabilities will be merged with any existing capabilities previously given (e.g., at initialization).
   */
  registerCapabilities(capabilities) {
    if (this.transport)
      throw new Error("Cannot register capabilities after connecting to transport");
    this._capabilities = mergeCapabilities(this._capabilities, capabilities);
  }
  /**
   * Override request handler registration to enforce server-side validation for tools/call.
   */
  setRequestHandler(requestSchema, handler) {
    let methodSchema = getObjectShape(requestSchema)?.method;
    if (!methodSchema)
      throw new Error("Schema is missing a method literal");
    let methodValue = getLiteralValue(methodSchema);
    if (typeof methodValue != "string")
      throw new Error("Schema method literal must be a string");
    if (methodValue === "tools/call") {
      let wrappedHandler = async (request2, extra) => {
        let validatedRequest = safeParse2(CallToolRequestSchema, request2);
        if (!validatedRequest.success) {
          let errorMessage = validatedRequest.error instanceof Error ? validatedRequest.error.message : String(validatedRequest.error);
          throw new McpError(ErrorCode.InvalidParams, `Invalid tools/call request: ${errorMessage}`);
        }
        let { params: params2 } = validatedRequest.data, result = await Promise.resolve(handler(request2, extra));
        if (params2.task) {
          let taskValidationResult = safeParse2(CreateTaskResultSchema, result);
          if (!taskValidationResult.success) {
            let errorMessage = taskValidationResult.error instanceof Error ? taskValidationResult.error.message : String(taskValidationResult.error);
            throw new McpError(ErrorCode.InvalidParams, `Invalid task creation result: ${errorMessage}`);
          }
          return taskValidationResult.data;
        }
        let validationResult = safeParse2(CallToolResultSchema, result);
        if (!validationResult.success) {
          let errorMessage = validationResult.error instanceof Error ? validationResult.error.message : String(validationResult.error);
          throw new McpError(ErrorCode.InvalidParams, `Invalid tools/call result: ${errorMessage}`);
        }
        return validationResult.data;
      };
      return super.setRequestHandler(requestSchema, wrappedHandler);
    }
    return super.setRequestHandler(requestSchema, handler);
  }
  assertCapabilityForMethod(method2) {
    switch (method2) {
      case "sampling/createMessage":
        if (!this._clientCapabilities?.sampling)
          throw new Error(`Client does not support sampling (required for ${method2})`);
        break;
      case "elicitation/create":
        if (!this._clientCapabilities?.elicitation)
          throw new Error(`Client does not support elicitation (required for ${method2})`);
        break;
      case "roots/list":
        if (!this._clientCapabilities?.roots)
          throw new Error(`Client does not support listing roots (required for ${method2})`);
        break;
      case "ping":
        break;
    }
  }
  assertNotificationCapability(method2) {
    switch (method2) {
      case "notifications/message":
        if (!this._capabilities.logging)
          throw new Error(`Server does not support logging (required for ${method2})`);
        break;
      case "notifications/resources/updated":
      case "notifications/resources/list_changed":
        if (!this._capabilities.resources)
          throw new Error(`Server does not support notifying about resources (required for ${method2})`);
        break;
      case "notifications/tools/list_changed":
        if (!this._capabilities.tools)
          throw new Error(`Server does not support notifying of tool list changes (required for ${method2})`);
        break;
      case "notifications/prompts/list_changed":
        if (!this._capabilities.prompts)
          throw new Error(`Server does not support notifying of prompt list changes (required for ${method2})`);
        break;
      case "notifications/elicitation/complete":
        if (!this._clientCapabilities?.elicitation?.url)
          throw new Error(`Client does not support URL elicitation (required for ${method2})`);
        break;
      case "notifications/cancelled":
        break;
      case "notifications/progress":
        break;
    }
  }
  assertRequestHandlerCapability(method2) {
    if (this._capabilities)
      switch (method2) {
        case "completion/complete":
          if (!this._capabilities.completions)
            throw new Error(`Server does not support completions (required for ${method2})`);
          break;
        case "logging/setLevel":
          if (!this._capabilities.logging)
            throw new Error(`Server does not support logging (required for ${method2})`);
          break;
        case "prompts/get":
        case "prompts/list":
          if (!this._capabilities.prompts)
            throw new Error(`Server does not support prompts (required for ${method2})`);
          break;
        case "resources/list":
        case "resources/templates/list":
        case "resources/read":
          if (!this._capabilities.resources)
            throw new Error(`Server does not support resources (required for ${method2})`);
          break;
        case "tools/call":
        case "tools/list":
          if (!this._capabilities.tools)
            throw new Error(`Server does not support tools (required for ${method2})`);
          break;
        case "tasks/get":
        case "tasks/list":
        case "tasks/result":
        case "tasks/cancel":
          if (!this._capabilities.tasks)
            throw new Error(`Server does not support tasks capability (required for ${method2})`);
          break;
        case "ping":
        case "initialize":
          break;
      }
  }
  assertTaskCapability(method2) {
    assertClientRequestTaskCapability(this._clientCapabilities?.tasks?.requests, method2, "Client");
  }
  assertTaskHandlerCapability(method2) {
    this._capabilities && assertToolsCallTaskCapability(this._capabilities.tasks?.requests, method2, "Server");
  }
  async _oninitialize(request2) {
    let requestedVersion = request2.params.protocolVersion;
    return this._clientCapabilities = request2.params.capabilities, this._clientVersion = request2.params.clientInfo, {
      protocolVersion: SUPPORTED_PROTOCOL_VERSIONS.includes(requestedVersion) ? requestedVersion : LATEST_PROTOCOL_VERSION,
      capabilities: this.getCapabilities(),
      serverInfo: this._serverInfo,
      ...this._instructions && { instructions: this._instructions }
    };
  }
  /**
   * After initialization has completed, this will be populated with the client's reported capabilities.
   */
  getClientCapabilities() {
    return this._clientCapabilities;
  }
  /**
   * After initialization has completed, this will be populated with information about the client's name and version.
   */
  getClientVersion() {
    return this._clientVersion;
  }
  getCapabilities() {
    return this._capabilities;
  }
  async ping() {
    return this.request({ method: "ping" }, EmptyResultSchema);
  }
  // Implementation
  async createMessage(params2, options) {
    if ((params2.tools || params2.toolChoice) && !this._clientCapabilities?.sampling?.tools)
      throw new Error("Client does not support sampling tools capability.");
    if (params2.messages.length > 0) {
      let lastMessage = params2.messages[params2.messages.length - 1], lastContent = Array.isArray(lastMessage.content) ? lastMessage.content : [lastMessage.content], hasToolResults = lastContent.some((c) => c.type === "tool_result"), previousMessage = params2.messages.length > 1 ? params2.messages[params2.messages.length - 2] : void 0, previousContent = previousMessage ? Array.isArray(previousMessage.content) ? previousMessage.content : [previousMessage.content] : [], hasPreviousToolUse = previousContent.some((c) => c.type === "tool_use");
      if (hasToolResults) {
        if (lastContent.some((c) => c.type !== "tool_result"))
          throw new Error("The last message must contain only tool_result content if any is present");
        if (!hasPreviousToolUse)
          throw new Error("tool_result blocks are not matching any tool_use from the previous message");
      }
      if (hasPreviousToolUse) {
        let toolUseIds = new Set(previousContent.filter((c) => c.type === "tool_use").map((c) => c.id)), toolResultIds = new Set(lastContent.filter((c) => c.type === "tool_result").map((c) => c.toolUseId));
        if (toolUseIds.size !== toolResultIds.size || ![...toolUseIds].every((id3) => toolResultIds.has(id3)))
          throw new Error("ids of tool_result blocks and tool_use blocks from previous message do not match");
      }
    }
    return params2.tools ? this.request({ method: "sampling/createMessage", params: params2 }, CreateMessageResultWithToolsSchema, options) : this.request({ method: "sampling/createMessage", params: params2 }, CreateMessageResultSchema, options);
  }
  /**
   * Creates an elicitation request for the given parameters.
   * For backwards compatibility, `mode` may be omitted for form requests and will default to `'form'`.
   * @param params The parameters for the elicitation request.
   * @param options Optional request options.
   * @returns The result of the elicitation request.
   */
  async elicitInput(params2, options) {
    switch (params2.mode ?? "form") {
      case "url": {
        if (!this._clientCapabilities?.elicitation?.url)
          throw new Error("Client does not support url elicitation.");
        let urlParams = params2;
        return this.request({ method: "elicitation/create", params: urlParams }, ElicitResultSchema, options);
      }
      case "form": {
        if (!this._clientCapabilities?.elicitation?.form)
          throw new Error("Client does not support form elicitation.");
        let formParams = params2.mode === "form" ? params2 : { ...params2, mode: "form" }, result = await this.request({ method: "elicitation/create", params: formParams }, ElicitResultSchema, options);
        if (result.action === "accept" && result.content && formParams.requestedSchema)
          try {
            let validationResult = this._jsonSchemaValidator.getValidator(formParams.requestedSchema)(result.content);
            if (!validationResult.valid)
              throw new McpError(ErrorCode.InvalidParams, `Elicitation response content does not match requested schema: ${validationResult.errorMessage}`);
          } catch (error64) {
            throw error64 instanceof McpError ? error64 : new McpError(ErrorCode.InternalError, `Error validating elicitation response: ${error64 instanceof Error ? error64.message : String(error64)}`);
          }
        return result;
      }
    }
  }
  /**
   * Creates a reusable callback that, when invoked, will send a `notifications/elicitation/complete`
   * notification for the specified elicitation ID.
   *
   * @param elicitationId The ID of the elicitation to mark as complete.
   * @param options Optional notification options. Useful when the completion notification should be related to a prior request.
   * @returns A function that emits the completion notification when awaited.
   */
  createElicitationCompletionNotifier(elicitationId, options) {
    if (!this._clientCapabilities?.elicitation?.url)
      throw new Error("Client does not support URL elicitation (required for notifications/elicitation/complete)");
    return () => this.notification({
      method: "notifications/elicitation/complete",
      params: {
        elicitationId
      }
    }, options);
  }
  async listRoots(params2, options) {
    return this.request({ method: "roots/list", params: params2 }, ListRootsResultSchema, options);
  }
  /**
   * Sends a logging message to the client, if connected.
   * Note: You only need to send the parameters object, not the entire JSON RPC message
   * @see LoggingMessageNotification
   * @param params
   * @param sessionId optional for stateless and backward compatibility
   */
  async sendLoggingMessage(params2, sessionId) {
    if (this._capabilities.logging && !this.isMessageIgnored(params2.level, sessionId))
      return this.notification({ method: "notifications/message", params: params2 });
  }
  async sendResourceUpdated(params2) {
    return this.notification({
      method: "notifications/resources/updated",
      params: params2
    });
  }
  async sendResourceListChanged() {
    return this.notification({
      method: "notifications/resources/list_changed"
    });
  }
  async sendToolListChanged() {
    return this.notification({ method: "notifications/tools/list_changed" });
  }
  async sendPromptListChanged() {
    return this.notification({ method: "notifications/prompts/list_changed" });
  }
};

// node_modules/@modelcontextprotocol/sdk/dist/esm/server/completable.js
var COMPLETABLE_SYMBOL = /* @__PURE__ */ Symbol.for("mcp.completable");
function isCompletable(schema) {
  return !!schema && typeof schema == "object" && COMPLETABLE_SYMBOL in schema;
}
function getCompleter(schema) {
  return schema[COMPLETABLE_SYMBOL]?.complete;
}
var McpZodTypeKind;
(function(McpZodTypeKind2) {
  McpZodTypeKind2.Completable = "McpCompletable";
})(McpZodTypeKind || (McpZodTypeKind = {}));

// node_modules/@modelcontextprotocol/sdk/dist/esm/shared/toolNameValidation.js
var TOOL_NAME_REGEX = /^[A-Za-z0-9._-]{1,128}$/;
function validateToolName(name2) {
  let warnings = [];
  if (name2.length === 0)
    return {
      isValid: !1,
      warnings: ["Tool name cannot be empty"]
    };
  if (name2.length > 128)
    return {
      isValid: !1,
      warnings: [`Tool name exceeds maximum length of 128 characters (current: ${name2.length})`]
    };
  if (name2.includes(" ") && warnings.push("Tool name contains spaces, which may cause parsing issues"), name2.includes(",") && warnings.push("Tool name contains commas, which may cause parsing issues"), (name2.startsWith("-") || name2.endsWith("-")) && warnings.push("Tool name starts or ends with a dash, which may cause parsing issues in some contexts"), (name2.startsWith(".") || name2.endsWith(".")) && warnings.push("Tool name starts or ends with a dot, which may cause parsing issues in some contexts"), !TOOL_NAME_REGEX.test(name2)) {
    let invalidChars = name2.split("").filter((char) => !/[A-Za-z0-9._-]/.test(char)).filter((char, index4, arr) => arr.indexOf(char) === index4);
    return warnings.push(`Tool name contains invalid characters: ${invalidChars.map((c) => `"${c}"`).join(", ")}`, "Allowed characters are: A-Z, a-z, 0-9, underscore (_), dash (-), and dot (.)"), {
      isValid: !1,
      warnings
    };
  }
  return {
    isValid: !0,
    warnings
  };
}
function issueToolNameWarning(name2, warnings) {
  if (warnings.length > 0) {
    console.warn(`Tool name validation warning for "${name2}":`);
    for (let warning of warnings)
      console.warn(`  - ${warning}`);
    console.warn("Tool registration will proceed, but this may cause compatibility issues."), console.warn("Consider updating the tool name to conform to the MCP tool naming standard."), console.warn("See SEP: Specify Format for Tool Names (https://github.com/modelcontextprotocol/modelcontextprotocol/issues/986) for more details.");
  }
}
function validateAndWarnToolName(name2) {
  let result = validateToolName(name2);
  return issueToolNameWarning(name2, result.warnings), result.isValid;
}

// node_modules/@modelcontextprotocol/sdk/dist/esm/experimental/tasks/mcp-server.js
var ExperimentalMcpServerTasks = class {
  constructor(_mcpServer) {
    this._mcpServer = _mcpServer;
  }
  registerToolTask(name2, config2, handler) {
    let execution = { taskSupport: "required", ...config2.execution };
    if (execution.taskSupport === "forbidden")
      throw new Error(`Cannot register task-based tool '${name2}' with taskSupport 'forbidden'. Use registerTool() instead.`);
    return this._mcpServer._createRegisteredTool(name2, config2.title, config2.description, config2.inputSchema, config2.outputSchema, config2.annotations, execution, config2._meta, handler);
  }
};

// node_modules/@modelcontextprotocol/sdk/dist/esm/server/mcp.js
function toolInputElementCount(value3, max4) {
  let count4 = 0, stack2 = [value3];
  for (; stack2.length > 0; ) {
    let node2 = stack2.pop();
    if (!(node2 === null || typeof node2 != "object"))
      if (Array.isArray(node2))
        for (let child of node2) {
          if (++count4 > max4)
            return count4;
          child !== null && typeof child == "object" && stack2.push(child);
        }
      else
        for (let key2 in node2) {
          if (!Object.prototype.hasOwnProperty.call(node2, key2))
            continue;
          if (++count4 > max4)
            return count4;
          let child = node2[key2];
          child !== null && typeof child == "object" && stack2.push(child);
        }
  }
  return count4;
}
function resolveMaxToolInputElements(value3) {
  if (!(value3 === void 0 || value3 === 1 / 0)) {
    if (typeof value3 != "number" || Number.isNaN(value3) || value3 < 1)
      throw new RangeError(`maxToolInputElements must be a number of at least 1, or Infinity, got ${String(value3)}`);
    return value3;
  }
}
var McpServer = class {
  constructor(serverInfo, options) {
    this._registeredResources = {}, this._registeredResourceTemplates = {}, this._registeredTools = {}, this._registeredPrompts = {}, this._toolHandlersInitialized = !1, this._completionHandlerInitialized = !1, this._resourceHandlersInitialized = !1, this._promptHandlersInitialized = !1, this.server = new Server(serverInfo, options), this._maxToolInputElements = resolveMaxToolInputElements(options?.maxToolInputElements);
  }
  /**
   * Access experimental features.
   *
   * WARNING: These APIs are experimental and may change without notice.
   *
   * @experimental
   */
  get experimental() {
    return this._experimental || (this._experimental = {
      tasks: new ExperimentalMcpServerTasks(this)
    }), this._experimental;
  }
  /**
   * Attaches to the given transport, starts it, and starts listening for messages.
   *
   * The `server` object assumes ownership of the Transport, replacing any callbacks that have already been set, and expects that it is the only user of the Transport instance going forward.
   */
  async connect(transport) {
    return await this.server.connect(transport);
  }
  /**
   * Closes the connection.
   */
  async close() {
    await this.server.close();
  }
  setToolRequestHandlers() {
    this._toolHandlersInitialized || (this.server.assertCanSetRequestHandler(getMethodValue(ListToolsRequestSchema)), this.server.assertCanSetRequestHandler(getMethodValue(CallToolRequestSchema)), this.server.registerCapabilities({
      tools: {
        listChanged: !0
      }
    }), this.server.setRequestHandler(ListToolsRequestSchema, () => ({
      tools: Object.entries(this._registeredTools).filter(([, tool2]) => tool2.enabled).map(([name2, tool2]) => {
        let toolDefinition = {
          name: name2,
          title: tool2.title,
          description: tool2.description,
          inputSchema: (() => {
            let obj = normalizeObjectSchema(tool2.inputSchema);
            return obj ? toJsonSchemaCompat(obj, {
              strictUnions: !0,
              pipeStrategy: "input"
            }) : EMPTY_OBJECT_JSON_SCHEMA;
          })(),
          annotations: tool2.annotations,
          execution: tool2.execution,
          _meta: tool2._meta
        };
        if (tool2.outputSchema) {
          let obj = normalizeObjectSchema(tool2.outputSchema);
          obj && (toolDefinition.outputSchema = toJsonSchemaCompat(obj, {
            strictUnions: !0,
            pipeStrategy: "output"
          }));
        }
        return toolDefinition;
      })
    })), this.server.setRequestHandler(CallToolRequestSchema, async (request2, extra) => {
      try {
        let tool2 = this._registeredTools[request2.params.name];
        if (!tool2)
          throw new McpError(ErrorCode.InvalidParams, `Tool ${request2.params.name} not found`);
        if (!tool2.enabled)
          throw new McpError(ErrorCode.InvalidParams, `Tool ${request2.params.name} disabled`);
        let isTaskRequest = !!request2.params.task, taskSupport = tool2.execution?.taskSupport, isTaskHandler = "createTask" in tool2.handler;
        if ((taskSupport === "required" || taskSupport === "optional") && !isTaskHandler)
          throw new McpError(ErrorCode.InternalError, `Tool ${request2.params.name} has taskSupport '${taskSupport}' but was not registered with registerToolTask`);
        if (taskSupport === "required" && !isTaskRequest)
          throw new McpError(ErrorCode.MethodNotFound, `Tool ${request2.params.name} requires task augmentation (taskSupport: 'required')`);
        if (taskSupport === "optional" && !isTaskRequest && isTaskHandler)
          return await this.handleAutomaticTaskPolling(tool2, request2, extra);
        let args = await this.validateToolInput(tool2, request2.params.arguments, request2.params.name), result = await this.executeToolHandler(tool2, args, extra);
        return isTaskRequest || await this.validateToolOutput(tool2, result, request2.params.name), result;
      } catch (error64) {
        if (error64 instanceof McpError && error64.code === ErrorCode.UrlElicitationRequired)
          throw error64;
        return this.createToolError(error64 instanceof Error ? error64.message : String(error64));
      }
    }), this._toolHandlersInitialized = !0);
  }
  /**
   * Creates a tool error result.
   *
   * @param errorMessage - The error message.
   * @returns The tool error result.
   */
  createToolError(errorMessage) {
    return {
      content: [
        {
          type: "text",
          text: errorMessage
        }
      ],
      isError: !0
    };
  }
  /**
   * Validates tool input arguments against the tool's input schema.
   */
  async validateToolInput(tool2, args, toolName) {
    if (this._maxToolInputElements !== void 0 && toolInputElementCount(args, this._maxToolInputElements) > this._maxToolInputElements)
      throw new McpError(ErrorCode.InvalidParams, `Invalid arguments for tool ${toolName}: arguments contain more than the maximum of ${this._maxToolInputElements} elements`);
    if (!tool2.inputSchema)
      return;
    let schemaToParse = normalizeObjectSchema(tool2.inputSchema) ?? tool2.inputSchema, parseResult = await safeParseAsync2(schemaToParse, args ?? {});
    if (!parseResult.success) {
      let error64 = "error" in parseResult ? parseResult.error : "Unknown error", errorMessage = getParseErrorMessage(error64);
      throw new McpError(ErrorCode.InvalidParams, `Input validation error: Invalid arguments for tool ${toolName}: ${errorMessage}`);
    }
    return parseResult.data;
  }
  /**
   * Validates tool output against the tool's output schema.
   */
  async validateToolOutput(tool2, result, toolName) {
    if (!tool2.outputSchema || !("content" in result) || result.isError)
      return;
    if (!result.structuredContent)
      throw new McpError(ErrorCode.InvalidParams, `Output validation error: Tool ${toolName} has an output schema but no structured content was provided`);
    let outputObj = normalizeObjectSchema(tool2.outputSchema), parseResult = await safeParseAsync2(outputObj, result.structuredContent);
    if (!parseResult.success) {
      let error64 = "error" in parseResult ? parseResult.error : "Unknown error", errorMessage = getParseErrorMessage(error64);
      throw new McpError(ErrorCode.InvalidParams, `Output validation error: Invalid structured content for tool ${toolName}: ${errorMessage}`);
    }
  }
  /**
   * Executes a tool handler (either regular or task-based).
   */
  async executeToolHandler(tool2, args, extra) {
    let handler = tool2.handler;
    if ("createTask" in handler) {
      if (!extra.taskStore)
        throw new Error("No task store provided.");
      let taskExtra = { ...extra, taskStore: extra.taskStore };
      if (tool2.inputSchema) {
        let typedHandler = handler;
        return await Promise.resolve(typedHandler.createTask(args, taskExtra));
      } else {
        let typedHandler = handler;
        return await Promise.resolve(typedHandler.createTask(taskExtra));
      }
    }
    if (tool2.inputSchema) {
      let typedHandler = handler;
      return await Promise.resolve(typedHandler(args, extra));
    } else {
      let typedHandler = handler;
      return await Promise.resolve(typedHandler(extra));
    }
  }
  /**
   * Handles automatic task polling for tools with taskSupport 'optional'.
   */
  async handleAutomaticTaskPolling(tool2, request2, extra) {
    if (!extra.taskStore)
      throw new Error("No task store provided for task-capable tool.");
    let args = await this.validateToolInput(tool2, request2.params.arguments, request2.params.name), handler = tool2.handler, taskExtra = { ...extra, taskStore: extra.taskStore }, createTaskResult = args ? await Promise.resolve(handler.createTask(args, taskExtra)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await Promise.resolve(handler.createTask(taskExtra))
    ), taskId = createTaskResult.task.taskId, task = createTaskResult.task, pollInterval = task.pollInterval ?? 5e3;
    for (; task.status !== "completed" && task.status !== "failed" && task.status !== "cancelled"; ) {
      await new Promise((resolve9) => setTimeout(resolve9, pollInterval));
      let updatedTask = await extra.taskStore.getTask(taskId);
      if (!updatedTask)
        throw new McpError(ErrorCode.InternalError, `Task ${taskId} not found during polling`);
      task = updatedTask;
    }
    return await extra.taskStore.getTaskResult(taskId);
  }
  setCompletionRequestHandler() {
    this._completionHandlerInitialized || (this.server.assertCanSetRequestHandler(getMethodValue(CompleteRequestSchema)), this.server.registerCapabilities({
      completions: {}
    }), this.server.setRequestHandler(CompleteRequestSchema, async (request2) => {
      switch (request2.params.ref.type) {
        case "ref/prompt":
          return assertCompleteRequestPrompt(request2), this.handlePromptCompletion(request2, request2.params.ref);
        case "ref/resource":
          return assertCompleteRequestResourceTemplate(request2), this.handleResourceCompletion(request2, request2.params.ref);
        default:
          throw new McpError(ErrorCode.InvalidParams, `Invalid completion reference: ${request2.params.ref}`);
      }
    }), this._completionHandlerInitialized = !0);
  }
  async handlePromptCompletion(request2, ref2) {
    let prompt = this._registeredPrompts[ref2.name];
    if (!prompt)
      throw new McpError(ErrorCode.InvalidParams, `Prompt ${ref2.name} not found`);
    if (!prompt.enabled)
      throw new McpError(ErrorCode.InvalidParams, `Prompt ${ref2.name} disabled`);
    if (!prompt.argsSchema)
      return EMPTY_COMPLETION_RESULT;
    let field3 = getObjectShape(prompt.argsSchema)?.[request2.params.argument.name];
    if (!isCompletable(field3))
      return EMPTY_COMPLETION_RESULT;
    let completer = getCompleter(field3);
    if (!completer)
      return EMPTY_COMPLETION_RESULT;
    let suggestions = await completer(request2.params.argument.value, request2.params.context);
    return createCompletionResult(suggestions);
  }
  async handleResourceCompletion(request2, ref2) {
    let template = Object.values(this._registeredResourceTemplates).find((t) => t.resourceTemplate.uriTemplate.toString() === ref2.uri);
    if (!template) {
      if (this._registeredResources[ref2.uri])
        return EMPTY_COMPLETION_RESULT;
      throw new McpError(ErrorCode.InvalidParams, `Resource template ${request2.params.ref.uri} not found`);
    }
    let completer = template.resourceTemplate.completeCallback(request2.params.argument.name);
    if (!completer)
      return EMPTY_COMPLETION_RESULT;
    let suggestions = await completer(request2.params.argument.value, request2.params.context);
    return createCompletionResult(suggestions);
  }
  setResourceRequestHandlers() {
    this._resourceHandlersInitialized || (this.server.assertCanSetRequestHandler(getMethodValue(ListResourcesRequestSchema)), this.server.assertCanSetRequestHandler(getMethodValue(ListResourceTemplatesRequestSchema)), this.server.assertCanSetRequestHandler(getMethodValue(ReadResourceRequestSchema)), this.server.registerCapabilities({
      resources: {
        listChanged: !0
      }
    }), this.server.setRequestHandler(ListResourcesRequestSchema, async (request2, extra) => {
      let resources = Object.entries(this._registeredResources).filter(([_, resource]) => resource.enabled).map(([uri2, resource]) => ({
        uri: uri2,
        name: resource.name,
        ...resource.metadata
      })), templateResources = [];
      for (let template of Object.values(this._registeredResourceTemplates)) {
        if (!template.resourceTemplate.listCallback)
          continue;
        let result = await template.resourceTemplate.listCallback(extra);
        for (let resource of result.resources)
          templateResources.push({
            ...template.metadata,
            // the defined resource metadata should override the template metadata if present
            ...resource
          });
      }
      return { resources: [...resources, ...templateResources] };
    }), this.server.setRequestHandler(ListResourceTemplatesRequestSchema, async () => ({ resourceTemplates: Object.entries(this._registeredResourceTemplates).map(([name2, template]) => ({
      name: name2,
      uriTemplate: template.resourceTemplate.uriTemplate.toString(),
      ...template.metadata
    })) })), this.server.setRequestHandler(ReadResourceRequestSchema, async (request2, extra) => {
      let uri2 = new URL(request2.params.uri), resource = this._registeredResources[uri2.toString()];
      if (resource) {
        if (!resource.enabled)
          throw new McpError(ErrorCode.InvalidParams, `Resource ${uri2} disabled`);
        return resource.readCallback(uri2, extra);
      }
      for (let template of Object.values(this._registeredResourceTemplates)) {
        let variables = template.resourceTemplate.uriTemplate.match(uri2.toString());
        if (variables)
          return template.readCallback(uri2, variables, extra);
      }
      throw new McpError(ErrorCode.InvalidParams, `Resource ${uri2} not found`);
    }), this._resourceHandlersInitialized = !0);
  }
  setPromptRequestHandlers() {
    this._promptHandlersInitialized || (this.server.assertCanSetRequestHandler(getMethodValue(ListPromptsRequestSchema)), this.server.assertCanSetRequestHandler(getMethodValue(GetPromptRequestSchema)), this.server.registerCapabilities({
      prompts: {
        listChanged: !0
      }
    }), this.server.setRequestHandler(ListPromptsRequestSchema, () => ({
      prompts: Object.entries(this._registeredPrompts).filter(([, prompt]) => prompt.enabled).map(([name2, prompt]) => ({
        name: name2,
        title: prompt.title,
        description: prompt.description,
        arguments: prompt.argsSchema ? promptArgumentsFromSchema(prompt.argsSchema) : void 0
      }))
    })), this.server.setRequestHandler(GetPromptRequestSchema, async (request2, extra) => {
      let prompt = this._registeredPrompts[request2.params.name];
      if (!prompt)
        throw new McpError(ErrorCode.InvalidParams, `Prompt ${request2.params.name} not found`);
      if (!prompt.enabled)
        throw new McpError(ErrorCode.InvalidParams, `Prompt ${request2.params.name} disabled`);
      if (prompt.argsSchema) {
        let argsObj = normalizeObjectSchema(prompt.argsSchema), parseResult = await safeParseAsync2(argsObj, request2.params.arguments ?? {});
        if (!parseResult.success) {
          let error64 = "error" in parseResult ? parseResult.error : "Unknown error", errorMessage = getParseErrorMessage(error64);
          throw new McpError(ErrorCode.InvalidParams, `Invalid arguments for prompt ${request2.params.name}: ${errorMessage}`);
        }
        let args = parseResult.data, cb = prompt.callback;
        return await Promise.resolve(cb(args, extra));
      } else {
        let cb = prompt.callback;
        return await Promise.resolve(cb(extra));
      }
    }), this._promptHandlersInitialized = !0);
  }
  resource(name2, uriOrTemplate, ...rest) {
    let metadata2;
    typeof rest[0] == "object" && (metadata2 = rest.shift());
    let readCallback = rest[0];
    if (typeof uriOrTemplate == "string") {
      if (this._registeredResources[uriOrTemplate])
        throw new Error(`Resource ${uriOrTemplate} is already registered`);
      let registeredResource = this._createRegisteredResource(name2, void 0, uriOrTemplate, metadata2, readCallback);
      return this.setResourceRequestHandlers(), this.sendResourceListChanged(), registeredResource;
    } else {
      if (this._registeredResourceTemplates[name2])
        throw new Error(`Resource template ${name2} is already registered`);
      let registeredResourceTemplate = this._createRegisteredResourceTemplate(name2, void 0, uriOrTemplate, metadata2, readCallback);
      return this.setResourceRequestHandlers(), this.sendResourceListChanged(), registeredResourceTemplate;
    }
  }
  registerResource(name2, uriOrTemplate, config2, readCallback) {
    if (typeof uriOrTemplate == "string") {
      if (this._registeredResources[uriOrTemplate])
        throw new Error(`Resource ${uriOrTemplate} is already registered`);
      let registeredResource = this._createRegisteredResource(name2, config2.title, uriOrTemplate, config2, readCallback);
      return this.setResourceRequestHandlers(), this.sendResourceListChanged(), registeredResource;
    } else {
      if (this._registeredResourceTemplates[name2])
        throw new Error(`Resource template ${name2} is already registered`);
      let registeredResourceTemplate = this._createRegisteredResourceTemplate(name2, config2.title, uriOrTemplate, config2, readCallback);
      return this.setResourceRequestHandlers(), this.sendResourceListChanged(), registeredResourceTemplate;
    }
  }
  _createRegisteredResource(name2, title2, uri2, metadata2, readCallback) {
    let registeredResource = {
      name: name2,
      title: title2,
      metadata: metadata2,
      readCallback,
      enabled: !0,
      disable: () => registeredResource.update({ enabled: !1 }),
      enable: () => registeredResource.update({ enabled: !0 }),
      remove: () => registeredResource.update({ uri: null }),
      update: (updates) => {
        typeof updates.uri < "u" && updates.uri !== uri2 && (delete this._registeredResources[uri2], updates.uri && (this._registeredResources[updates.uri] = registeredResource)), typeof updates.name < "u" && (registeredResource.name = updates.name), typeof updates.title < "u" && (registeredResource.title = updates.title), typeof updates.metadata < "u" && (registeredResource.metadata = updates.metadata), typeof updates.callback < "u" && (registeredResource.readCallback = updates.callback), typeof updates.enabled < "u" && (registeredResource.enabled = updates.enabled), this.sendResourceListChanged();
      }
    };
    return this._registeredResources[uri2] = registeredResource, registeredResource;
  }
  _createRegisteredResourceTemplate(name2, title2, template, metadata2, readCallback) {
    let registeredResourceTemplate = {
      resourceTemplate: template,
      title: title2,
      metadata: metadata2,
      readCallback,
      enabled: !0,
      disable: () => registeredResourceTemplate.update({ enabled: !1 }),
      enable: () => registeredResourceTemplate.update({ enabled: !0 }),
      remove: () => registeredResourceTemplate.update({ name: null }),
      update: (updates) => {
        typeof updates.name < "u" && updates.name !== name2 && (delete this._registeredResourceTemplates[name2], updates.name && (this._registeredResourceTemplates[updates.name] = registeredResourceTemplate)), typeof updates.title < "u" && (registeredResourceTemplate.title = updates.title), typeof updates.template < "u" && (registeredResourceTemplate.resourceTemplate = updates.template), typeof updates.metadata < "u" && (registeredResourceTemplate.metadata = updates.metadata), typeof updates.callback < "u" && (registeredResourceTemplate.readCallback = updates.callback), typeof updates.enabled < "u" && (registeredResourceTemplate.enabled = updates.enabled), this.sendResourceListChanged();
      }
    };
    this._registeredResourceTemplates[name2] = registeredResourceTemplate;
    let variableNames = template.uriTemplate.variableNames;
    return Array.isArray(variableNames) && variableNames.some((v2) => !!template.completeCallback(v2)) && this.setCompletionRequestHandler(), registeredResourceTemplate;
  }
  _createRegisteredPrompt(name2, title2, description2, argsSchema, callback) {
    let registeredPrompt = {
      title: title2,
      description: description2,
      argsSchema: argsSchema === void 0 ? void 0 : objectFromShape(argsSchema),
      callback,
      enabled: !0,
      disable: () => registeredPrompt.update({ enabled: !1 }),
      enable: () => registeredPrompt.update({ enabled: !0 }),
      remove: () => registeredPrompt.update({ name: null }),
      update: (updates) => {
        typeof updates.name < "u" && updates.name !== name2 && (delete this._registeredPrompts[name2], updates.name && (this._registeredPrompts[updates.name] = registeredPrompt)), typeof updates.title < "u" && (registeredPrompt.title = updates.title), typeof updates.description < "u" && (registeredPrompt.description = updates.description), typeof updates.argsSchema < "u" && (registeredPrompt.argsSchema = objectFromShape(updates.argsSchema)), typeof updates.callback < "u" && (registeredPrompt.callback = updates.callback), typeof updates.enabled < "u" && (registeredPrompt.enabled = updates.enabled), this.sendPromptListChanged();
      }
    };
    return this._registeredPrompts[name2] = registeredPrompt, argsSchema && Object.values(argsSchema).some((field3) => {
      let inner = field3 instanceof ZodOptional2 ? field3._def?.innerType : field3;
      return isCompletable(inner);
    }) && this.setCompletionRequestHandler(), registeredPrompt;
  }
  _createRegisteredTool(name2, title2, description2, inputSchema, outputSchema, annotations, execution, _meta, handler) {
    validateAndWarnToolName(name2);
    let registeredTool = {
      title: title2,
      description: description2,
      inputSchema: getZodSchemaObject(inputSchema),
      outputSchema: getZodSchemaObject(outputSchema),
      annotations,
      execution,
      _meta,
      handler,
      enabled: !0,
      disable: () => registeredTool.update({ enabled: !1 }),
      enable: () => registeredTool.update({ enabled: !0 }),
      remove: () => registeredTool.update({ name: null }),
      update: (updates) => {
        typeof updates.name < "u" && updates.name !== name2 && (typeof updates.name == "string" && validateAndWarnToolName(updates.name), delete this._registeredTools[name2], updates.name && (this._registeredTools[updates.name] = registeredTool)), typeof updates.title < "u" && (registeredTool.title = updates.title), typeof updates.description < "u" && (registeredTool.description = updates.description), typeof updates.paramsSchema < "u" && (registeredTool.inputSchema = objectFromShape(updates.paramsSchema)), typeof updates.outputSchema < "u" && (registeredTool.outputSchema = objectFromShape(updates.outputSchema)), typeof updates.callback < "u" && (registeredTool.handler = updates.callback), typeof updates.annotations < "u" && (registeredTool.annotations = updates.annotations), typeof updates._meta < "u" && (registeredTool._meta = updates._meta), typeof updates.enabled < "u" && (registeredTool.enabled = updates.enabled), this.sendToolListChanged();
      }
    };
    return this._registeredTools[name2] = registeredTool, this.setToolRequestHandlers(), this.sendToolListChanged(), registeredTool;
  }
  /**
   * tool() implementation. Parses arguments passed to overrides defined above.
   */
  tool(name2, ...rest) {
    if (this._registeredTools[name2])
      throw new Error(`Tool ${name2} is already registered`);
    let description2, inputSchema, outputSchema, annotations;
    if (typeof rest[0] == "string" && (description2 = rest.shift()), rest.length > 1) {
      let firstArg = rest[0];
      if (isZodRawShapeCompat(firstArg))
        inputSchema = rest.shift(), rest.length > 1 && typeof rest[0] == "object" && rest[0] !== null && !isZodRawShapeCompat(rest[0]) && (annotations = rest.shift());
      else if (typeof firstArg == "object" && firstArg !== null) {
        if (Object.values(firstArg).some((v2) => typeof v2 == "object" && v2 !== null))
          throw new Error(`Tool ${name2} expected a Zod schema or ToolAnnotations, but received an unrecognized object`);
        annotations = rest.shift();
      }
    }
    let callback = rest[0];
    return this._createRegisteredTool(name2, void 0, description2, inputSchema, outputSchema, annotations, { taskSupport: "forbidden" }, void 0, callback);
  }
  /**
   * Registers a tool with a config object and callback.
   */
  registerTool(name2, config2, cb) {
    if (this._registeredTools[name2])
      throw new Error(`Tool ${name2} is already registered`);
    let { title: title2, description: description2, inputSchema, outputSchema, annotations, _meta } = config2;
    return this._createRegisteredTool(name2, title2, description2, inputSchema, outputSchema, annotations, { taskSupport: "forbidden" }, _meta, cb);
  }
  prompt(name2, ...rest) {
    if (this._registeredPrompts[name2])
      throw new Error(`Prompt ${name2} is already registered`);
    let description2;
    typeof rest[0] == "string" && (description2 = rest.shift());
    let argsSchema;
    rest.length > 1 && (argsSchema = rest.shift());
    let cb = rest[0], registeredPrompt = this._createRegisteredPrompt(name2, void 0, description2, argsSchema, cb);
    return this.setPromptRequestHandlers(), this.sendPromptListChanged(), registeredPrompt;
  }
  /**
   * Registers a prompt with a config object and callback.
   */
  registerPrompt(name2, config2, cb) {
    if (this._registeredPrompts[name2])
      throw new Error(`Prompt ${name2} is already registered`);
    let { title: title2, description: description2, argsSchema } = config2, registeredPrompt = this._createRegisteredPrompt(name2, title2, description2, argsSchema, cb);
    return this.setPromptRequestHandlers(), this.sendPromptListChanged(), registeredPrompt;
  }
  /**
   * Checks if the server is connected to a transport.
   * @returns True if the server is connected
   */
  isConnected() {
    return this.server.transport !== void 0;
  }
  /**
   * Sends a logging message to the client, if connected.
   * Note: You only need to send the parameters object, not the entire JSON RPC message
   * @see LoggingMessageNotification
   * @param params
   * @param sessionId optional for stateless and backward compatibility
   */
  async sendLoggingMessage(params2, sessionId) {
    return this.server.sendLoggingMessage(params2, sessionId);
  }
  /**
   * Sends a resource list changed event to the client, if connected.
   */
  sendResourceListChanged() {
    this.isConnected() && this.server.sendResourceListChanged();
  }
  /**
   * Sends a tool list changed event to the client, if connected.
   */
  sendToolListChanged() {
    this.isConnected() && this.server.sendToolListChanged();
  }
  /**
   * Sends a prompt list changed event to the client, if connected.
   */
  sendPromptListChanged() {
    this.isConnected() && this.server.sendPromptListChanged();
  }
};
var EMPTY_OBJECT_JSON_SCHEMA = {
  type: "object",
  properties: {}
};
function isZodTypeLike(value3) {
  return value3 !== null && typeof value3 == "object" && "parse" in value3 && typeof value3.parse == "function" && "safeParse" in value3 && typeof value3.safeParse == "function";
}
function isZodSchemaInstance(obj) {
  return "_def" in obj || "_zod" in obj || isZodTypeLike(obj);
}
function isZodRawShapeCompat(obj) {
  return typeof obj != "object" || obj === null || isZodSchemaInstance(obj) ? !1 : Object.keys(obj).length === 0 ? !0 : Object.values(obj).some(isZodTypeLike);
}
function getZodSchemaObject(schema) {
  if (schema) {
    if (isZodRawShapeCompat(schema))
      return objectFromShape(schema);
    if (!isZodSchemaInstance(schema))
      throw new Error("inputSchema must be a Zod schema or raw shape, received an unrecognized object");
    return schema;
  }
}
function promptArgumentsFromSchema(schema) {
  let shape2 = getObjectShape(schema);
  return shape2 ? Object.entries(shape2).map(([name2, field3]) => {
    let description2 = getSchemaDescription(field3), isOptional = isSchemaOptional(field3);
    return {
      name: name2,
      description: description2,
      required: !isOptional
    };
  }) : [];
}
function getMethodValue(schema) {
  let methodSchema = getObjectShape(schema)?.method;
  if (!methodSchema)
    throw new Error("Schema is missing a method literal");
  let value3 = getLiteralValue(methodSchema);
  if (typeof value3 == "string")
    return value3;
  throw new Error("Schema method literal must be a string");
}
function createCompletionResult(suggestions) {
  return {
    completion: {
      values: suggestions.slice(0, 100),
      total: suggestions.length,
      hasMore: suggestions.length > 100
    }
  };
}
var EMPTY_COMPLETION_RESULT = {
  completion: {
    values: [],
    hasMore: !1
  }
};

// node_modules/@modelcontextprotocol/sdk/dist/esm/server/stdio.js
import process2 from "node:process";

// node_modules/@modelcontextprotocol/sdk/dist/esm/shared/stdio.js
var STDIO_DEFAULT_MAX_BUFFER_SIZE = 10 * 1024 * 1024, ReadBuffer = class {
  constructor(options) {
    this._maxBufferSize = options?.maxBufferSize ?? STDIO_DEFAULT_MAX_BUFFER_SIZE;
  }
  append(chunk) {
    if ((this._buffer?.length ?? 0) + chunk.length > this._maxBufferSize)
      throw this.clear(), new Error(`ReadBuffer exceeded maximum size of ${this._maxBufferSize} bytes`);
    this._buffer = this._buffer ? Buffer.concat([this._buffer, chunk]) : chunk;
  }
  readMessage() {
    if (!this._buffer)
      return null;
    let index4 = this._buffer.indexOf(`
`);
    if (index4 === -1)
      return null;
    let line4 = this._buffer.toString("utf8", 0, index4).replace(/\r$/, "");
    return this._buffer = this._buffer.subarray(index4 + 1), deserializeMessage(line4);
  }
  clear() {
    this._buffer = void 0;
  }
};
function deserializeMessage(line4) {
  return JSONRPCMessageSchema.parse(JSON.parse(line4));
}
function serializeMessage(message) {
  return JSON.stringify(message) + `
`;
}

// node_modules/@modelcontextprotocol/sdk/dist/esm/server/stdio.js
var StdioServerTransport = class {
  constructor(_stdin = process2.stdin, _stdout = process2.stdout, options) {
    this._stdin = _stdin, this._stdout = _stdout, this._started = !1, this._ondata = (chunk) => {
      try {
        this._readBuffer.append(chunk), this.processReadBuffer();
      } catch (error64) {
        this.onerror?.(error64), this.close().catch(() => {
        });
      }
    }, this._onerror = (error64) => {
      this.onerror?.(error64);
    }, this._readBuffer = new ReadBuffer({ maxBufferSize: options?.maxBufferSize });
  }
  /**
   * Starts listening for messages on stdin.
   */
  async start() {
    if (this._started)
      throw new Error("StdioServerTransport already started! If using Server class, note that connect() calls start() automatically.");
    this._started = !0, this._stdin.on("data", this._ondata), this._stdin.on("error", this._onerror);
  }
  processReadBuffer() {
    for (; ; )
      try {
        let message = this._readBuffer.readMessage();
        if (message === null)
          break;
        this.onmessage?.(message);
      } catch (error64) {
        this.onerror?.(error64);
      }
  }
  async close() {
    this._stdin.off("data", this._ondata), this._stdin.off("error", this._onerror), this._stdin.listenerCount("data") === 0 && this._stdin.pause(), this._readBuffer.clear(), this.onclose?.();
  }
  send(message) {
    return new Promise((resolve9) => {
      let json3 = serializeMessage(message);
      this._stdout.write(json3) ? resolve9() : this._stdout.once("drain", resolve9);
    });
  }
};

// node_modules/@modelcontextprotocol/ext-apps/dist/src/server/index.js
var D = "ui/resourceUri", L = "text/html;profile=mcp-app";
function j(B3, Q, F, V) {
  let q = F._meta, J = q.ui, Z = q[D], $ = q;
  return J?.resourceUri && !Z ? $ = { ...q, [D]: J.resourceUri } : Z && !J?.resourceUri && ($ = { ...q, ui: { ...J, resourceUri: Z } }), B3.registerTool(Q, { ...F, _meta: $ }, V);
}
function G(B3, Q, F, V, q) {
  return B3.registerResource(Q, F, { mimeType: L, ...V }, q);
}
var W = "io.modelcontextprotocol/ui";
function H(B3) {
  if (B3)
    return B3.extensions?.[W];
}
// End of bundle text, part 6 of 15
export { G, H, L, McpServer, StdioServerTransport, j };

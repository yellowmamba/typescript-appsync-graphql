import bunyan from "bunyan";
import { AllMessages, GetMessage, StoreMessage } from "./resolvers";

const logger = bunyan.createLogger({
  name: "appsync",
})

interface HandlerEvent {
  identity: any
  arguments: any
  field: string
}

export const handler = (event: HandlerEvent) => {
  logger.info(event)

  switch (event.field) {
    case "getMessage":
      return GetMessage(event.arguments);
    case "allMessages":
      return AllMessages(event.arguments);
    case "storeMessage":
      return StoreMessage(event.arguments);
    default:
      return Promise.reject(`unknown operation: ${event.field}`)
  }
}

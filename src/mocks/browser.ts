import { setupWorker } from "msw/browser";
import { seedDB } from "./db";
import { handlers } from "./handlers";

const worker = setupWorker(...handlers);

seedDB();

export async function enableMocking() {
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

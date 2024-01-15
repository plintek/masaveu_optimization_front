import { RouteElement } from "@interfaces/config/RouteElement.interface";

import { generalRoutes } from "./routes/general.routes";
import { adminRoutes } from "./routes/user/admin.routes";

const routes: RouteElement[] = [...generalRoutes, ...adminRoutes];

export { routes };

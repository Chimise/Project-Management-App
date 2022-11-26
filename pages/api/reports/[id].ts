import handler from "../../../utils/handler";
import isAuth from "../../../middlewares/isAuth";
import { viewReport } from "../../../controllers/report";

export default handler().use(isAuth).patch(viewReport);
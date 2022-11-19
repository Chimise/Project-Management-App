import handler from "../../../utils/handler";
import { updateOne } from "../../../controllers/user";
import isAuth from "../../../middlewares/isAuth";

export default handler().use(isAuth).put(updateOne);
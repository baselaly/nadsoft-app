import server from "./common/utils/server.util.js";
import envConfig from "./common/config/env.config.js";

server.listen(envConfig.PORT || 3000, () => {
  console.log("app running");
});


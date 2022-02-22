import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import styleImport, { VantResolve } from "vite-plugin-style-import";


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // loadEnv加载__dirname目录下的 mode文件，若mode为'test',则加载.env.test文件。
  const env = loadEnv(mode, __dirname) 
  return {
    plugins: [
      vue(),
      styleImport({
        resolves: [VantResolve()],
      }),
    ],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    //静态资源服务的文件夹
    publicDir: "public",
    //静态资源处理
    assetsInclude: "",
    base: env.VITE_RES_URL
  }
});

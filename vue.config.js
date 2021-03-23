module.exports = {
    css: {
      loaderOptions: {
        sass: {
          additionalData: // this makes the main.scss sass file reacheble in all the files project
          ` @import "@/styles/main.scss";`
        }
      }
    }
  };
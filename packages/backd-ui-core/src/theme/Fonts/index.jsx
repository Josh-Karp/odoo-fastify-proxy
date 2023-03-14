const Fonts = {
  bold: `@font-face {
        font-family: "neutrif-pro-bold";
        src: url("NeutrifPro-Bold.eot");
        src: local("NeutrifPro-Bold"),
          url("NeutrifPro-Bold.eot?#iefix") format("embedded-opentype"),
          url("NeutrifPro-Bold.woff2") format("woff2"),
          url("NeutrifPro-Bold.woff") format("woff"),
          url("NeutrifPro-Bold.ttf") format("truetype");
        font-weight: bold;
        font-style: normal;
      }`,
  semi: `      
      @font-face {
        font-family: "neutrif-pro-semibold";
        src: url("NeutrifPro-SemiBold.eot");
        src: local("NeutrifPro-SemiBold"),
          url("NeutrifPro-SemiBold.eot?#iefix") format("embedded-opentype"),
          url("NeutrifPro-SemiBold.woff2") format("woff2"),
          url("NeutrifPro-SemiBold.woff") format("woff"),
          url("NeutrifPro-SemiBold.ttf") format("truetype");
        font-weight: 600;
        font-style: normal;
      }`,
  regular: `
      @font-face {
        font-family: "neutrif-pro-regular";
        src: url("NeutrifPro-Regular.eot");
        src: local("NeutrifPro-Regular"),
          url("NeutrifPro-Regular.eot?#iefix") format("embedded-opentype"),
          url("NeutrifPro-Regular.woff2") format("woff2"),
          url("NeutrifPro-Regular.woff") format("woff"),
          url("NeutrifPro-Regular.ttf") format("truetype");
        font-weight: normal;
        font-style: normal;
      }
      `,
};

export default Fonts;

import wccodeSupportedLangs from "https://cdn.jsdelivr.net/gh/vanillawc/wc-code@1.0.3/src/language-details.js"

class ChrimsonGreen extends HTMLElement{
  async connectedCallback(){
    this.script = this.getScript()
    if(!this.script) await this._setScriptIfSrc()
    // if there is no script tag or path, do nothing
    if(!this.script) return
    this.setContentMD()
    this.setHTMLContent()
  }

  /**
   * gets a script of type="x" or type="wc-content" to render stuff in
   */
  getScript(){
    let script = this.querySelector("script[type='x']");
    if(!script) script = this.querySelector("script[type='wc-content']")
    if(!script) return null
    return script
  }

  /**
   * sets the script location if there is a path attribute
   */
  async _setScriptIfSrc(){
    const path = this.getAttribute("src");
    if(!path) return;
    const content = await fetch(path);
    const md = await content.text()
    const script = document.createElement("script");
    script.setAttribute("type", "x");
    script.innerHTML = md;
    this.append(script);
    this.script = script;
  }

  setContentMD(){
    let text = this.script.innerText;
    if(text.charAt(0) == "\n") text = text.substring(1);
    
    // how many spaces are there in the start, screw tabs
    let numSpaces = 0;
    let currChar = text.charAt(numSpaces);
    while (currChar == " "){
      numSpaces += 1
      currChar = text.charAt(numSpaces)
    }

    // remove all whitespace line-by-line
    const lines = text.split("\n");

    for(let i=0; i<lines.length; i++){
      let line = lines[i];

      for(let j=0; j<numSpaces; j++){
        let char = line.charAt(0);
        if(char == " ") line = line.substring(1);
        else break;
      }

      lines[i] = line;
    }

    this.contentMD = lines.join("\n");
  }

  setHTMLContent(){
    // Actual default values
    var md = markdownit("default", {
      html : this.hasAttribute("unsafe"),
      highlight: (str, lang) => {
        if(lang in wccodeSupportedLangs.languages){
          return `<pre style="white-space:normal;"><wc-code mode=${lang}><script type="wc-content">${str}</script></wc-code></pre>`;
        } else if (lang == "cg-youtube"){
            return this.createYouTubeContainer(str)
        }

        return "";
      }
    });
    this.innerHTML = md.render(this.contentMD);
  }

  simpleChrimsonParse(value){
      value = value.trim()
      const keyValsArr = value.split("\n").map(value => {
          const vals = value.split(":")
          return [vals[0].trim(), vals.slice(1).join("").trim()]
      })     
      const keyVal = {}

      for(let [key, val] of keyValsArr){
          keyVal[key] = val;
      }

      return keyVal
  }

  createYouTubeContainer(data){
      const values = this.simpleChrimsonParse(data)

      let autoresize = false;
      let randomizedId = ""
      const chars = "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"

      for(let i=0; i<15; i++){
          randomizedId += chars[Math.floor(Math.random()*chars.length)]
      }

      // if height and width are unspecified autoresize is true
      if(!values.width && !values.height) autoresize = true;

      values.ratio = Number.parseFloat(values.ratio)||(16/9);

      if(values.height && values.ratio && !values.width){
          values.height = Number.parseFloat(values.height)
          values.width = values.height*values.ratio;
      }

      values.width = Number.parseFloat(values.width)||this.getBoundingClientRect().width;
      values.height = values.height||values.width/values.ratio;

      if(autoresize){
          window.addEventListener("resize", () => {
              values.width = this.getBoundingClientRect().width;
              values.height = values.width/values.ratio;
              const iframe = document.getElementById(randomizedId);
              iframe.height = values.height;
              iframe.width = values.width;
          })
      }
      const v = values.url.split("v=")[1]
      return `<iframe id="${randomizedId}" width="${values.width}" height="${values.height}" src="https://www.youtube-nocookie.com/embed/${v}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  }
}

customElements.define("chrimson-green", ChrimsonGreen);

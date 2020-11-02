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
    var md = markdownit({
      highlight: function (str, lang) {
        if(lang in wccodeSupportedLangs.languages){
          return `<wc-code mode=${lang}><script type="wc-content">${str}</script></wc-code>`;
        }

        return "";
      }
    });
    this.innerHTML = md.render(this.contentMD);
  }
}

customElements.define("chrimson-green", ChrimsonGreen);

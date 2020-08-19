// ==UserScript==
// @name         CG Upload Code
// @description  CodinGame IDE Upload Code Button
// @namespace    https://github.com/blegloannec/cg-gm-scripts
// @version      1
// @include      https://www.codingame.com/ide/*
// @run-at       document-idle
// @grant        unsafeWindow
// ==/UserScript==

add_upload_button_when_ready();

function add_upload_button_when_ready() {
    var code_buttons = document.getElementsByClassName("code-buttons");
    if (code_buttons.length === 0) setTimeout(add_upload_button_when_ready, 500);
    else add_upload_button();
}

function add_upload_button() {
    var b_up = document.createElement("button");
    b_up.setAttribute("class", "header-button");
    b_up.setAttribute("style", 'background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAb0lEQVQ4y2NgGAX0AIwMDAzLoJiRGgb2MjAw/IfiXkoNy0UyDIZzyTXMn4GB4S8WA/9C5UgGN7EYBsM3KfF2A5JBDYQUM1E7SQwtAxuIDSd8eliI1NQwYF7G5sJ6KKY4DI8wMDB8IcOML1C9QwQAAPqKI/sn0vd8AAAAAElFTkSuQmCC")');
    b_up.addEventListener("click", upload_button_click, false);
    var code_b = document.getElementsByClassName("code-buttons")[0];
    code_b.appendChild(b_up);
}

function upload_button_click() {
    var virtual_file_button = document.createElement("input");
    virtual_file_button.setAttribute("type", "file");
    virtual_file_button.addEventListener("change", upload_code, false);
    return virtual_file_button.click();
}

function upload_code() {
    var monaco = unsafeWindow.monaco.editor.getModels()[0];
    var f = new FileReader();
    f.addEventListener("load", function() { monaco.setValue(f.result); }, false);
    f.readAsText(this.files[0]);
}

var that;
class Tab {
    constructor(id) {
        // get elements
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.tabadd'); // div - adds new tab when clicked
        this.ul = this.main.querySelector('.tabnavbar ul:first-child'); // ul - holds tab labels
        this.section = this.main.querySelector('.tabscon'); // div - tab content container
        this.init();
    }
    // get elements, add functions&index
    init() {
        this.updateNode(); // get li and section elements
        // the tab adding div must be binded with addTab function 
        this.add.onclick = this.addTab;
        // all individual tab label must be binded with functions.  
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab; // toggleTab method called by <li>, <li> has index
            this.delete[i].onclick = this.deleteTab;
            this.spans[i].ondblclick = this.editTab; // edit tab label
            this.sections[i].ondblclick = this.editTab;
        }
    }
    // remove li and section class - deactive li and section
    clearClass() {
        // use this keyword because clearClass() will always be called within the Tab class
        for(let i = 0; i < this.lis.length; i++){
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    // when added/deleted elements, re-obtain elements
    updateNode() {
        this.lis = this.main.querySelectorAll('li'); // li - each tab label
        this.sections = this.main.querySelectorAll('section'); // section - each tab content
        this.delete = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.tabnavbar li span:first-child');
    }
    // 1. Function - Toggle Tab
    toggleTab() {
        that.clearClass();
        this.className = 'liactive'; // toggleTab() called by li element
        that.sections[this.index].className = 'conactive';
    }
    // 2. Function - Add Tab
    addTab() {
        that.clearClass();
        const random = Math.random();
        // add new li and section elment into HTML
        const li = '<li class="liactive"><span>New Tab</span><span class="iconfont icon-guanbi"></span></li>';
        const sec = '<section class="conactive">Test ' + random + '</section>';
        that.ul.insertAdjacentHTML('beforeend', li);
        that.section.insertAdjacentHTML('beforeend', sec);
        that.init(); // update elements and re-assign functions and index
    }
    // 3. Function - Delete Tab
    deleteTab(e) {
        e.stopPropagation(); // prevent event bubbles up, so that toogleTab() on <li> won't trigger
        let index = this.parentNode.index;
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        // when a de-active tab is deleted（.liactive still exist, keep active state (do nothing)
        if (document.querySelector('.liactive')) return;
        // when an active tab is deleted (no .liactive exist), select the tab before it
        index--;
        // trigger a click event on <li> to active the tab
        that.lis[index] && that.lis[index].click();
    }
    // 4. Function - Edit Tab
    editTab() {
        let str = this.innerHTML; // get text inside span
        // prevent double-click text selection
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = '<input type="text" />'; // input box inside span
        // get input element inside span
        const input = this.children[0];
        // assign text to input box
        input.value = str;
        // select text inside input box
        input.select(); 
        // exit input box, set new input value to span.innerHTML
        input.onblur = function() {
            this.parentNode.innerHTML = this.value;
        };
        // when enter key up, trigger blur event on input element
        input.onkeyup = function(e) {
            if(e.keyCode === 13) {
                this.blur();
            }
        }
    }

}
new Tab('#tab');
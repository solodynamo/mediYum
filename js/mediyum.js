(function() {
    const // Root object, this is going to be the window for now
    root = this;

    const // Safely store a document here for us to use
    document = this.document;
    const EDGE = -999;

    let editableNodes = document.querySelectorAll(".g-body");

    const // TODO: cross el support for imageUpload
    editNode = editableNodes[0];

    const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');

    let options = {
        animate: true
    };

    let textMenu;
    let optionsNode;

    mediYum = {
            attachAllTheStuff(bindableNodes, opts) {
                if (bindableNodes) {
                    editableNodes = bindableNodes;
                }

                options = opts || options;

                attachToolbarTemplate();
                bindTextSelectionEvents();
                bindTextStylingEvents();
            },
            select() {
                triggerTextSelection();
            }
        },

        tagClassMap = {
            "b": "bold",
            "r": "red",
            "u": "underline"
        };

    function attachToolbarTemplate() {
        const div = document.createElement("div");

        const toolbarTemplate = "<div class='options'> \
      <span class='no-overflow'> \
        <span class='ui-inputs'> \
          <button class='bold'>B</button> \
          <button class='red'>R</button> \
          <button class='underline'>U</button> \
        </span> \
      </span> \
    </div>";

        const toolbarContainer = document.createElement("div");

        toolbarContainer.className = "g-body";
        document.body.appendChild(toolbarContainer);

        div.className = "text-menu hide";
        div.innerHTML = toolbarTemplate;

        if (document.querySelectorAll(".text-menu").length === 0) {
            toolbarContainer.appendChild(div);

        }

        textMenu = document.querySelectorAll(".text-menu")[0];
        optionsNode = document.querySelectorAll(".text-menu .options")[0];
    }

    function bindTextSelectionEvents() {
        let i;
        let len;
        let node;

        // Trigger on both mousedown and mouseup so that the click on the menu
        // feels more instantaneously active
        document.onmousedown = triggerTextSelection;
        document.onmouseup = event => {
            setTimeout(() => {
                triggerTextSelection(event); //triggerTextSelection resposible for handling pos of toolbar
            }, 1);
        };

        document.onkeydown = preprocessKeyDown; // prevents from entering an p after hr

        document.onkeyup = event => {
            const sel = window.getSelection();

            // FF will return sel.anchorNode to be the parentNode when the triggered keyCode is 13
            if (sel.anchorNode && sel.anchorNode.nodeName !== "form") {
                triggerNodeAnalysis(event); // Responsible for how node will look after enter and how block should be positioned
            }
        };

        // Handle window resize events
        root.onresize = triggerTextSelection;

        for (i = 0, len = editableNodes.length; i < len; i++) {
            node = editableNodes[i];
            node.contentEditable = true;
            node.onmousedown = node.onkeyup = node.onmouseup = triggerTextSelection;
        }
    }

    function getHorizontalBounds(nodes, target, event) {
        const bounds = [];
        let bound;
        let i;
        let len;
        let preNode;
        let postNode;
        let bottomBound;
        let topBound;
        let coordY;

        // Compute top and bottom bounds for each child element
        for (i = 0, len = nodes.length - 1; i < len; i++) {
            preNode = nodes[i];
            postNode = nodes[i + 1] || null;

            bottomBound = preNode.getBoundingClientRect().bottom - 5;
            topBound = postNode.getBoundingClientRect().top;

            bounds.push({
                top: topBound,
                bottom: bottomBound,
                topElement: preNode,
                bottomElement: postNode,
                index: i + 1
            });
        }

        coordY = event.pageY - root.scrollY;

        // Find if there is a range to insert the image tooltip between two elements
        for (i = 0, len = bounds.length; i < len; i++) {
            bound = bounds[i];
            if (coordY < bound.top && coordY > bound.bottom) {
                return bound;
            }
        }

        return null;
    }

    function iterateTextMenuButtons(callback) {
        const textMenuButtons = document.querySelectorAll(".text-menu button");
        let i;
        let len;
        let node;

        const fnCallback = n => {
            callback(n);
        };

        for (i = 0, len = textMenuButtons.length; i < len; i++) {
            node = textMenuButtons[i];

            fnCallback(node);
        }
    }

    function bindTextStylingEvents() {
        iterateTextMenuButtons(node => {
            node.onmousedown = event => {
                triggerTextStyling(node);
            };
        });
    }

    function getFocusNode() {
        return root.getSelection().focusNode;
    }

    function reloadMenuState() {
        let className;
        const focusNode = getFocusNode();
        let tagClass;
        let reTag;

        iterateTextMenuButtons(node => {
            className = node.className;

            for (const tag in tagClassMap) {
                tagClass = tagClassMap[tag];
                reTag = new RegExp(tagClass);

                if (reTag.test(className)) {
                    if (hasParentWithTag(focusNode, tag)) {
                        node.className = `${tagClass} active`;
                    } else {
                        node.className = tagClass;
                    }

                    break;
                }
            }
        });
    }

    function preprocessKeyDown(event) {
        const sel = window.getSelection();
        addDragListeners()

        const // anchor node returns the node in which the selection begins.
        parentParagraph = getParentWithTag(sel.anchorNode, "p");

        let p;
        let isHr;

        if (event.keyCode === 13 && parentParagraph) {
            prevSibling = parentParagraph.previousSibling; // returns the node sibling(bro/sis) to current node
            isHr = prevSibling && prevSibling.nodeName === "HR" &&
                !parentParagraph.textContent.length; //text content represents text content of node and its descendants.

            // Stop enters from creating another <p> after a <hr> on enter
            if (isHr) {
                event.preventDefault();
            }
        }
    }

    function toggleFormatBlock(tag) {
        if (hasParentWithTag(getFocusNode(), tag)) {
            document.execCommand("formatBlock", false, "p"); //false: whether a deafatult UI should be shown  //use p as block
            document.execCommand("outdent"); // bring towards the margin
        } else {
            document.execCommand("formatBlock", false, tag);
        }
    }


    function triggerNodeAnalysis(event) {
        const sel = window.getSelection();
        let anchorNode;
        let parentParagraph;

        if (event.keyCode === 13) {

            // Enters should replace it's parent <div> with a <p>
            if (sel.anchorNode.nodeName === "DIV") {
                toggleFormatBlock("p");
            }

            parentParagraph = getParentWithTag(sel.anchorNode, "p");

            if (parentParagraph) {
                insertHorizontalRule(parentParagraph);
            }
        }
    }

    function insertHorizontalRule(parentParagraph) {
        //adds horizontal rule when pressed enter(13)
        let prevSibling;

        let prevPrevSibling;
        let hr;

        prevSibling = parentParagraph.previousSibling;
        prevPrevSibling = prevSibling;

        while (prevPrevSibling) {
            if (prevPrevSibling.nodeType != Node.TEXT_NODE) {
                break;
            }

            prevPrevSibling = prevPrevSibling.previousSibling;
        }

        if (prevSibling.nodeName === "P" && !prevSibling.textContent.length && prevPrevSibling.nodeName !== "HR") {
            hr = document.createElement("hr");
            hr.contentEditable = false;
            parentParagraph.parentNode.replaceChild(hr, prevSibling);
        }
    }

    function getTextProp(el) {
        let textProp;

        if (el.nodeType === Node.TEXT_NODE) {
            textProp = "data";
        } else if (isFirefox) {
            textProp = "textContent";
        } else {
            textProp = "innerText";
        }

        return textProp;
    }

    function moveCursorToBeginningOfSelection(selection, node) {
        range = document.createRange();
        range.setStart(node, 0);
        range.setEnd(node, 0);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    function triggerTextStyling(node) {
        //node : button.bold button.red           // this gets triggered when i choose any option from the toolbar
        const // className: red/bold
        className = node.className;

        const sel = window.getSelection();

        const //selNode: text
        selNode = sel.anchorNode;

        let tagClass;
        let reTag;

        for (const tag in tagClassMap) { //tag: 'b'/'r'
            tagClass = tagClassMap[tag]; //tagClass: 'bold'/'red'
            reTag = new RegExp(tagClass);

            if (reTag.test(className)) {
                switch (tag) {
                    case "b":
                        if (selNode && !hasParentWithTag(selNode, "h1") && !hasParentWithTag(selNode, "h2")) {
                            document.execCommand(tagClass, false);
                        }
                        return;

                    case "u":
                        document.execCommand(tagClass, false);
                        return;

                    case "r":
                        makeTextRed(tag);
                        return;


                }
            }
        }

        triggerTextSelection();
    }

    function makeTextRed(tag) {
        document.execCommand('styleWithCSS', false, true);
        document.execCommand('foreColor', false, "#ff0000");
    }

    function getParent(node, condition, returnCallback) {
        if (node === null) { //no current selection
            return;
        }

        while (node.parentNode) { //parentNode retunrs the parent of the specified node in the DOM tree
            if (condition(node)) { // I need to find a node with 'p' tag
                return returnCallback(node); //returning this found parent p
            }

            node = node.parentNode; // traversing upwards on every iteration.
        }
    }

    function getParentWithTag(node, nodeType) {
        const //nodeName returns the name of the current node as a string.
        checkNodeType = node => node.nodeName.toLowerCase() === nodeType;

        const returnNode = node => node;

        return getParent(node, checkNodeType, returnNode);
    }

    function hasParentWithTag(node, nodeType) { // node: 'text' nodeType: 'h1'
        return !!getParentWithTag(node, nodeType);
    }

    function triggerTextSelection(e) {
        const selectedText = root.getSelection();
        let range;
        let clientRectBounds;
        const target = e.target || e.srcElement;

        // The selected text is not editable
        if (!target.isContentEditable) {
            reloadMenuState();
            return;
        }

        // The selected text is collapsed, push the menu out of the way
        if (selectedText.isCollapsed) {
            setTextMenuPosition(EDGE, EDGE);
            textMenu.className = "text-menu hide";
        } else {
            range = selectedText.getRangeAt(0);
            clientRectBounds = range.getBoundingClientRect();

            // Every time we show the menu, reload the state
            reloadMenuState();
            setTextMenuPosition(
                clientRectBounds.top - 5 + root.pageYOffset,
                (clientRectBounds.left + clientRectBounds.right) / 2
            );
        }
    }


    //Decides whether to show the toolbar
    function setTextMenuPosition(top, left) {
        textMenu.style.top = `${top}px`;
        textMenu.style.left = `${left}px`;

        if (options.animate) {
            if (top === EDGE) {
                textMenu.className = "text-menu hide";
            } else {
                textMenu.className = "text-menu active";
            }
        }
    }

    function addDragListeners() {
      var draggable = document.querySelectorAll('[draggable]')
  		var targets = document.querySelectorAll('[data-drop-target]');
      console.log(draggable);
      console.log(targets);
      //Note: using the document.querySelectorAll() will aquire every element that is using the attribute defind in the (..)


  		//Register event listeners for the"dragstart" event on the draggable elements:
  		for(var i = 0; i < draggable.length; i++) {
  			draggable[i].addEventListener("dragstart", handleDragStart);
  		}

  		//Register event listeners for "dragover", "drop", "dragenter" & "dragleave" events on the drop target elements.
  		for(var i = 0; i < targets.length; i++) {
        console.log('yeah')
  			targets[i].addEventListener("dragover", handleOverDrop);
  			targets[i].addEventListener("drop", handleOverDrop);
  			targets[i].addEventListener("dragenter", handleDragEnterLeave);
  			targets[i].addEventListener("dragleave", handleDragEnterLeave);
  		}

    }

    function handleDragStart(e) {
    			e.dataTransfer.setData("text", this.id); //note: using "this" is the same as using: e.target.
    		}//end function


    		//The dragenter event fires when dragging an object over the target.
    		//The css class "drag-enter" is append to the targets object.
    		function handleDragEnterLeave(e) {
    			if(e.type == "dragenter") {
    				this.className = "drag-enter"
    			} else {
    				this.className = "" //Note: "this" referces to the target element where the "dragenter" event is firing from.
    			}
    		}//end function

    console.log("executed");

    		//Function handles dragover event eg.. moving your source div over the target div element.
    		//If drop event occurs, the function retrieves the draggable element’s id from the DataTransfer object.
    		function handleOverDrop(e) {
    			e.preventDefault();
          //Depending on the browser in use, not using the preventDefault() could cause any number of strange default behaviours to occur.
    			if (e.type != "drop") {
    				return; //Means function will exit if no "drop" event is fired.
    			}
    			//Stores dragged elements ID in var draggedId
    			var draggedId = e.dataTransfer.getData("text");
    			//Stores referrence to element being dragged in var draggedEl
    			var draggedEl = document.getElementById(draggedId);
          debugger;
    			//if the event "drop" is fired on the dragged elements original drop target e.i..  it's current parentNode,
    			//then set it's css class to ="" which will remove dotted lines around the drop target and exit the function.
    			if (draggedEl.parentNode == this) {
    				this.className = "";
    				return; //note: when a return is reached a function exits.
    			}
    			//Otherwise if the event "drop" is fired from a different target element, detach the dragged element node from it's
    			//current drop target (i.e current perantNode) and append it to the new target element. Also remove dotted css class.
    			draggedEl.parentNode.removeChild(draggedEl);
    			this.appendChild(draggedEl); //Note: "this" references to the current target div that is firing the "drop" event.
    			this.className = "";
    		}//end Function


    root.mediYum = mediYum;
}).call(this);

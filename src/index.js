import './scss/app.scss';


window.addEventListener('DOMContentLoaded', () => {
    const form = {
        from: '',
        to: '',
        weight: '',
        method: '',
        type: '',
        danger: '',
        price: '',
        regime: false,
        minRegime: '-21',
        maxRegime: '+23',
        radioChecked: '',
        comment: '',
    }
    
    function handleChangeInput() {
        const inputs = getAllElems('app__param-input');
        for (let input of inputs) {
            input.addEventListener('input', ({ target }) => {
                if (target.name === 'min-regime' || target.name === 'max-regime') {
                    target.value = target.value.replace(/[ /a-z A-Z а-я А-Я ]/gmi, '');
                }
                form[target.name] = target.value;
                const adr = getEl(`adress[name="${target.name}"]`)
                if (adr) {
                    adr.textContent = (target.value) ? target.value : 'Адрес не указан';
                }
            })
        }
    }

    function handleChangeSelect() {
        const selects = getAllElems('app__param-select');
        for (let select of selects) {
            const { span, ul, img } = getChildNodes(select);
            img.addEventListener('click', ({ target }) => {
                target.classList.toggle('drop-rotate');
                toggleHide(ul);
                getActiveOption(ul, span, img);
            })
        }


        function getChildNodes(parentEl) {
            const obj = {}
            for (let child of parentEl.children) {
                obj[child.nodeName.toLowerCase()] = child;
            }
            return obj;
        }

        function getActiveOption(select, selElem, drop) {
            for (let option of select.children) {
                option.addEventListener('click', function once() {
                    setValue(option.textContent, selElem);
                    option.parentElement.style.display = 'none';
                    drop.classList.remove('drop-rotate');
                    this.removeEventListener('click', once);
                })
            }
        }

        function toggleHide(elem) {
            if (getComputedStyle(elem).display === 'none') {
                elem.style.display = 'block';
                return
            }
            elem.style.display = 'none';
            return
        }

        function setValue(val, elem) {
            elem.textContent = val;
            elem.classList.add('filled');
            form[elem.getAttribute('name')] = val;
        }
    }

    function handleChangeCheckbox() {
        const checkbox = getEl('checkbox');
        checkbox.addEventListener('click', ({ target }) => {
            const regimeInputs = document.querySelectorAll('#regime');
            checkbox.classList.toggle('checked');
            form.regime = (checkbox.className.split(' ').indexOf('checked') === 1);
            for (let input of regimeInputs) {
                if (!form.regime) {
                    input.style.display = 'none';
                } else {
                    input.style.display = 'block';
                }
            }

        })
    }

    function handleChangeRadio() {
        const fromRadio = getEl('app__param-radio .radio[name="from"]');
        const toRadio = getEl('app__param-radio .radio[name="to"]');

        fromRadio.addEventListener('click', () => { toggleRadio(fromRadio, toRadio) });
        toRadio.addEventListener('click', () => { toggleRadio(toRadio, fromRadio) });

        function toggleRadio(add, remove) {
            add.classList.add('checked');
            const addSibl = add.nextElementSibling;
            form.radioChecked = addSibl.textContent;
            addSibl.nextElementSibling.classList.add('selected');

            remove.classList.remove('checked');
            const removeSibl = remove.nextElementSibling;
            removeSibl.nextElementSibling.classList.remove('selected');
        }
    }

    function handleChangeTextarea() {
        const text = getEl('app__param-textarea');
        text.addEventListener('input', ({ target }) => {
            form[target.name] = target.value;
        })
    }

    document.querySelector('form').addEventListener('input', function () {        
        for (let key in form) {
            if (!form[key]) {
                if (key !== 'regime') {
                    return
                }
            }
        }
        getEl('app__warning-message').style.display = 'none';
    })

    const getEl = (elemName) => document.querySelector(`.${elemName}`);
    const getAllElems = (elemsName) => document.querySelectorAll(`.${elemsName}`);



    handleChangeInput();
    handleChangeSelect();
    handleChangeCheckbox();
    handleChangeRadio();
    handleChangeTextarea();
})






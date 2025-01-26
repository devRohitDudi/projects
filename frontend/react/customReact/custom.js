function renderHTML(rootElement, elementData) {
    let newElement = document.createElement(elementData.type);
    newElement.innerHTML = elementData.content;

    // this code is repeating
    // newElement.setAttribute("target", elementData.props.target);
    // newElement.setAttribute("href", elementData.props.href);

    // avoiding repeatation
    for (const prop in elementData.props) {
        if (prop === "content") continue; // optional check
        newElement.setAttribute(prop, elementData.props[prop]);
    }

    rootElement.appendChild(newElement);
}


let elementData = {
    type: 'a',
    props: {
        target: '_blank',
        href: 'https://rohitdudi.vercel.app',
    },
    content: "Click here to visit RohitDudi's Website."
}

const rootElement = document.querySelector("#root");



renderHTML(rootElement, elementData);

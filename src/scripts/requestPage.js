const sendRequest = () => {
    const result = document.querySelector(".result");
    const site = document.querySelector("#website");
    const element = document.querySelector("#element");

    const url = new Request(`/element?site=https://${site.value}&element=${element.value}&showOnConsole=true`);

    result.innerHTML = `
        <ul>
            <li><span class="center"><img src="../images/spinner.svg" alt="Carregando"></span></li>
        </ul>
    `;

    fetch(url, {
        headers: {
            "content-type": "application/json"
        }
    })
        .then(data => data.json())
        .then(data => {
            result.innerHTML = "";

            data.forEach(s => {
                result.innerHTML += `
                    <ul>
                        <li>Content: <span id="content">${s.content}</span></li>
                        <li>Element: <span id="element">${s.element}</span></li>
                        <li>Title: <span id="title">${s.title}</span></li>
                        <li>Class: <span id="class">${s.class}</span></li>
                        <li>Id: <span id="id">${s.id}</span></li>
                        <li>href: <span id="href">${s.href}</span></li>
                    </ul>
                `;
            });
        })
        .catch(err => {
            result.innerHTML =`
                <ul>
                    <li>Error: <span id="content">${err}</span></li>
                </ul>
            `;
        });
}
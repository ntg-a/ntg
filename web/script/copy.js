const delay = 2500;



const popup = text => {
    let popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = text;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, delay);
}



const fallback = (text, resolve, reject) => {
    let area = document.createElement('textarea');
    area.style.position = 'fixed';
    area.style.height = '1.4rem';
    area.style.width = '1.4rem';
    area.style.left = '0';
    area.style.top = '0';
    area.value = text;

    document.body.appendChild(area);

    area.focus();
    area.select();
    let copied = false;
    try { copied = document.execCommand('copy'); }
    catch (err) { copied = false; }
    area.remove();

    if (copied) resolve();
    else reject();
}



const copy = text => {
    let copy = new Promise((resolve, reject) => {
        if (!navigator.clipboard) fallback(text, resolve, reject);
        else navigator.clipboard.writeText(text).then(resolve, () => {
            fallback(text, resolve, reject);
        })
    })

    copy.catch(() => popup('Failed to copy to clipboard'));
    copy.then(() => popup('Copied to clipboard'));
    return copy;
}



export default copy;

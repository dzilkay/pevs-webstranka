const dropbtn = document.getElementById('dropbtn');
dropdownContent = document.getElementById('content');

dropbtn.addEventListener('click', (event) => {
    if(dropdownContent.style.display === 'block')
        dropdownContent.style.display = 'none';
    else
        dropdownContent.style.display = 'block';
});
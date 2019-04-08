function findBook () {
	
	var userInput = document.getElementById('userInput').value;
	var bookResult = document.getElementById('result');
	bookResult.innerHTML = '';

	$.ajax({
		type: "GET",
		url: "https://www.googleapis.com/books/v1/volumes?q=" + userInput,
		dataType: "JSON",
		success: function (book) {
			for(var i = 0; book.items.length; i++){

				var wrapperDiv = document.createElement('div');
				wrapperDiv.className = 'media';

                var image = document.createElement('img');
                image.className = 'mr-3'; 
                image.src = book.items[i].volumeInfo.imageLinks.thumbnail;

                var div = document.createElement('div');
                div.className = 'media-body';

                var header = document.createElement('h5');
                header.className = 'mt-0';
                header.innerHTML = book.items[i].volumeInfo.title;
                div.appendChild(header);

                wrapperDiv.appendChild(image);
                wrapperDiv.appendChild(div);

                var author = document.createElement('h6');
                author.innerHTML = book.items[i].volumeInfo.authors;
                 
                if (author.innerHTML !=  'undefined') {
                	author.innerHTML = 'Author: ' + book.items[i].volumeInfo.authors;
                } else {
                	author.innerHTML = 'Author: ' + 'not named';
                }
                div.appendChild(author);

                var countrySide = document.createElement('p')
                countrySide.innerHTML = 'Country: ' + book.items[i].accessInfo.country;
                div.appendChild(countrySide);

                var desc = document.createElement('p');
                desc.innerHTML = book.items[i].volumeInfo.description;
                div.appendChild(desc);
               
                bookResult.appendChild(wrapperDiv);

                var line = document.createElement('hr');
                bookResult.appendChild(line);
            }
		} 
	}) 
}
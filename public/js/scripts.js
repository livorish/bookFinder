function findBook () {
	
	var userInput = document.getElementById('userInput').value;
	var bookResult = document.getElementById('result');
	bookResult.innerHTML = '';

	$.ajax({
		type: "GET",
		url: "https://www.googleapis.com/books/v1/volumes?q=" + userInput,
		dataType: "JSON",
		success: function (book) {
			console.log(book)
			for(var i = 0; book.items.length; i++){

				var wrapperDiv = document.createElement('div');
				wrapperDiv.className = 'media';

                var image = document.createElement('img');
                image.className = 'mr-3'; 
                image.src = book.items[i].volumeInfo.imageLinks.thumbnail;

                var div = document.createElement('div');
                div.className = 'media-body';

                var header = document.createElement('h3');
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
                countrySide.innerHTML = '<b>Country: </b>' + book.items[i].accessInfo.country;
                div.appendChild(countrySide);

                var yearOftheBook = document.createElement('p');
                yearOftheBook.innerHTML = '<b>Year: </b>' + book.items[i].volumeInfo.publishedDate;
                div.appendChild(yearOftheBook);

                var pageCount = document.createElement('p');
                pageCount.innerHTML = '<b>Pages: </b>' + book.items[i].volumeInfo.pageCount;
                div.appendChild(pageCount);

                var desc = document.createElement('p');
                desc.innerHTML = book.items[i].volumeInfo.description;
                div.appendChild(desc);
               
                bookResult.appendChild(wrapperDiv);
              

                var urlOfBook = document.createElement('a');                 
                urlOfBook.innerHTML = '<b>View more about the book</b>';
                urlOfBook.href = book.items[i].volumeInfo.previewLink;
                div.appendChild(urlOfBook);
                var line = document.createElement('hr');
                bookResult.appendChild(line);
            }
		} 
	}) 
}
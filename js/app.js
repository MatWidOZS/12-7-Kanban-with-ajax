// OGÓLNA FUNKCJA
/*function randomString() {
	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split();
	var str = '', i;
	for (i = 0; i < 10; i++) {
	  str += chars[Math.floor(Math.random() * chars.length)];
	}
	return str;
}*/  //Niepotrzebne - ID tworzone przez serwer

/*// TWORZENIE NOWYCH EGZEMPLARZY KOLUMN
var todoColumn = new Column('Do zrobienia');
var doingColumn = new Column('W trakcie');
var doneColumn = new Column('Skończone');

// DODAWANIE KOLUMN DO TABLICY
board.createColumn(todoColumn);
board.createColumn(doingColumn);
board.createColumn(doneColumn);

// TWORZENIE NOWYCH EGZEMPLARZY KART
var card1 = new Card('Nowe zadanie');
var card2 = new Card('stworzyc tablice kanban');

// DODAWANIE KART DO KOLUMN
todoColumn.createCard(card1);
doingColumn.createCard(card2);
*/

//Zmienne do komunikacji z serwerem
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
	'X-Client-Id': '2816',
	'X-Auth-Token': '62d048c875f53ff6b9e4dec110260925'
};

//Dodawanie nagłówków do zapytań
$.ajaxSetup({
	headers: myHeaders
});

//Odpytanie serwera o zasób tablicy
$.ajax({
	url: baseUrl + '/board',
	method: 'GET',
	success: function(response) {
		setupColumns(response.columns);
	}
});

//Tworzenie kolumn i podpinanie ich do tablicy
function setupColumns(columns) {
	columns.forEach(function (column) {
		var col = new Column(column.id, column.name);
		board.createColumn(col);
		setupCards(col, column.cards);
	});
}

//Ustawianie kart w odpowiednie kolumny
function setupCards(col, cards) {
	cards.forEach(function (card) {
		var cardObj = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
		col.createCard(cardObj);
	});
}
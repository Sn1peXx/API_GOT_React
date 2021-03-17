export default class GotService {
  constructor() {
    this._apiBase = "https://www.anapioficeandfire.com/api";
  }

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
    }
    return await res.json();
  };

  getCharacter = async (id) => {
    const res = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(res);
  };

  getBook = async (id) => {
    const res = await this.getResource(`/books/${id}/`);
    return this._transformBook(res);
  };

  getHouse = async (id) => {
    const res = await this.getResource(`/houses/${id}/`);
    return this._transformHouse(res);
  };

  getAllCharacters = async () => {
    const res = await this.getResource(`/characters?page=5&pageSize=10`);
    return res.map(this._transformCharacter);
  };

 
  getAllHouses = async () => {
    const res = await this.getResource(`/houses?page=1&pageSize=10`);
    return res.map(this._transformHouse);
  };

  getAllBooks = async () => {
    const res = await this.getResource(`/books?page=1&pageSize=10`);
    return res.map(this._transformBook);
  };

  _transformCharacter = (pers) => {
    return {
      name: pers.name,
      gender: pers.gender,
      born: pers.born,
      died: pers.died,
      culture: pers.culture,
    };
  };

  _transformHouse = (house) => {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons,
    };
  };

  _transformBook = (book) => {
    return {
      name: book.name,
      numberOfPage: book.numberOfPage,
      publiusher: book.publiusher,
      released: book.released,
    };
  };
}

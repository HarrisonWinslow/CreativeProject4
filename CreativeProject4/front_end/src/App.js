import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

let url = "http://ec2-54-193-12-198.us-west-1.compute.amazonaws.com:3001";

function App() {
  
  const [error, setError] = useState("");
  
  const [characters, setCharacters] = useState([]);
  const [name, setName] = useState("");
  const [characterClass, setCharacterClass] = useState("");
  const [race, setRace] = useState("");
  const [lvl, setLvl] = useState(0);
  const [str, setStr] = useState(0);
  const [dex, setDex] = useState(0);
  const [con, setCon] = useState(0);
  const [int, setInt] = useState(0);
  const [wis, setWis] = useState(0);
  const [cha, setCha] = useState(0);
  
  const [monsters, setMonsters] = useState([]);
  const [monsterName, setMonsterName] = useState("");
  const [monsterAc, setMonsterAc] = useState(0);
  const [monsterHp, setMonsterHp] = useState(0);
  const [monsterStr, setMonsterStr] = useState(0);
  const [monsterDex, setMonsterDex] = useState(0);
  const [monsterCon, setMonsterCon] = useState(0);
  const [monsterInt, setMonsterInt] = useState(0);
  const [monsterWis, setMonsterWis] = useState(0);
  const [monsterCha, setMonsterCha] = useState(0);
  
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  
  const fetchCharacters = async () => {
    try {
      const response = await axios.get(url + "/api1/characters");
      
      setCharacters(response.data.characters);
    } catch (error) {
      setError("error retrieving characters: " + error);
    }
  };
  const createCharacter = async () => {
    try {
      await axios.post(url + "/api1/characters", {
        name: name,
        characterClass: characterClass,
        race: race,
        lvl: lvl,
        str: str,
        dex: dex,
        con: con,
        int: int,
        wis: wis,
        cha: cha
      });
    } catch (error) {
      setError("error adding a character: " + error);
    }
  };
  const deleteOneCharacter = async(character) => {
    try {
      await axios.delete(url + "/api1/characters/" + character.id);
    } catch(error) {
      setError("error deleting a character: " + error);
    }
  };
  const updateLevel = async (character) => {
    try {
      await axios.put(url + "/api1/characters/" + character.id + "/" + character.lvl);
    } catch (error) {
      setError("error updating character's level: " + error);
    }
  };
  
  const fetchMonsters = async () => {
    try {
      const response = await axios.get(url + "/api1/monsters");
      
      setMonsters(response.data.monsters);
    } catch (error) {
      setError("error retrieving monsters: " + error);
    }
  };
  const createMonster = async () => {
    try {
      await axios.post(url + "/api1/monsters", {
        name: monsterName,
        ac: monsterAc,
        hp: monsterHp,
        str: monsterStr,
        dex: monsterDex,
        con: monsterCon,
        int: monsterInt,
        wis: monsterWis,
        cha: monsterCha
      });
    } catch (error) {
      setError("error adding a monster: " + error);
    }
  };
  const deleteOneMonster = async(monster) => {
    try {
      await axios.delete(url + "/api1/monsters/" + monster.id);
    } catch(error) {
      setError("error deleting a monster" + error);
    }
  };
  
  const fetchItems = async () => {
    try {
      const response = await axios.get(url + "/api1/items");
      
      setItems(response.data.items);
    } catch (error) {
      setError("error retrieving items: " + error);
    }
  };
  const createItem = async () => {
    try {
      await axios.post(url + "/api1/items", {
        name: itemName,
        itemDescription: itemDescription
      });
    } catch (error) {
      setError("error adding an item: " + error);
    }
  };
  const deleteOneItem = async(item) => {
    try {
      await axios.delete(url + "/api1/items/" + item.id);
    } catch(error) {
      setError("error deleting an item" + error);
    }
  };
  
  useEffect(() => {
    fetchCharacters();
    fetchMonsters();
    fetchItems();
  },[]);
  
  const addCharacter = async(e) => {
    e.preventDefault();
    await createCharacter();
    fetchCharacters();
    setName("");
    setCharacterClass("");
    setRace("");
    setLvl(0);
    setInt(0);
    setDex(0);
    setCon(0);
    setInt(0);
    setWis(0);
    setCha(0);
  };
  const addMonster = async(e) => {
    e.preventDefault();
    await createMonster();
    fetchMonsters();
    setMonsterName("");
    setMonsterAc(0);
    setMonsterHp(0);
    setMonsterInt(0);
    setMonsterDex(0);
    setMonsterCon(0);
    setMonsterInt(0);
    setMonsterWis(0);
    setMonsterCha(0);
  };
  const addItem = async(e) => {
    e.preventDefault();
    await createItem();
    fetchItems();
    setItemName("");
    setItemDescription("");
  };
  
  const deleteCharacter = async(character) => {
    await deleteOneCharacter(character);
    fetchCharacters();
  };
  const deleteMonster = async(monster) => {
    await deleteOneMonster(monster);
    fetchMonsters();
  };
  const deleteItem = async(item) => {
    await deleteOneItem(item);
    fetchItems();
  };
  
  const decrementLvl = async (character) => {
    if (character.lvl > 1) {
      character.lvl -= 1;
      await updateLevel(character);
      fetchCharacters();
    }
  };
  const incrementLvl = async (character) => {
    character.lvl += 1;
    await updateLevel(character);
    fetchCharacters();
  };
  
  
  
  
  return (
    <div className="App">
    {error}
    <div class="row">
      <div class="column">
        <h1>Create a Character</h1>
        <form onSubmit={addCharacter}>
        
            <div>
              <label>
                Name: 
                <input type="text" value={name} onChange={e => setName(e.target.value)} class="inputBox"/>
              </label>
            </div>
            <div>
              <label>
                Class: 
                <input value={characterClass} onChange={e=>setCharacterClass(e.target.value)} class="inputBox"/>
              </label>
            </div>
            <div>
              <label>
                Race: 
                <input value={race} onChange={e=>setRace(e.target.value)} class="inputBox"/>
              </label>
            </div>
            <div>
              <label>
                Level: 
                <input value={lvl} onChange={e=>setLvl(e.target.value)} class="inputBox"/>
              </label>
            </div>
            <div>
              <label>
                STR: 
                <input value={str} onChange={e=>setStr(e.target.value)} class="inputBox"/>
              </label>
            </div>
            <div>
              <label>
                DEX: 
                <input value={dex} onChange={e=>setDex(e.target.value)} class="inputBox"/>
              </label>
            </div>
            <div>
              <label>
                CON: 
                <input value={con} onChange={e=>setCon(e.target.value)} class="inputBox"/>
              </label>
            </div>
            <div>
              <label>
                INT: 
                <input value={int} onChange={e=>setInt(e.target.value)} class="inputBox"/>
              </label>
            </div>
            <div>
              <label>
                WIS: 
                <input value={wis} onChange={e=>setWis(e.target.value)} class="inputBox"/>
              </label>
            </div>
            <div>
              <label>
                CHA: 
                <input value={cha} onChange={e=>setCha(e.target.value)} class="inputBox"/>
              </label>
            </div>
            
            <input type="submit" value="Submit" class="submitBox"/>
          </form>
        </div>
        
        <div class="column">
        <h1>Create a Monster</h1>
        <form onSubmit={addMonster}>
        
            <div>
              <label>
                Name: 
                <input type="text" value={monsterName} onChange={e => setMonsterName(e.target.value)} class="inputBox"/>
              </label>
            </div>
            <div>
              <label>
                Armor class: 
                <input value={monsterAc} onChange={e=>setMonsterAc(e.target.value)} class="inputBox"/>
              </label>
            </div>
            <div>
              <label>
                Hit points: 
                <input value={monsterHp} onChange={e=>setMonsterHp(e.target.value)} class="inputBox"/>
              </label>
            </div>
            <div>
              <label>
                STR: 
                <input value={monsterStr} onChange={e=>setMonsterStr(e.target.value)} class="inputBox"/>
              </label>
            </div>
            <div>
              <label>
                DEX: 
                <input value={monsterDex} onChange={e=>setMonsterDex(e.target.value)} class="inputBox"/>
              </label>
            </div>
            <div>
              <label>
                CON: 
                <input value={monsterCon} onChange={e=>setMonsterCon(e.target.value)} class="inputBox"/>
              </label>
            </div>
            <div>
              <label>
                INT: 
                <input value={monsterInt} onChange={e=>setMonsterInt(e.target.value)} class="inputBox"/>
              </label>
            </div>
            <div>
              <label>
                WIS: 
                <input value={monsterWis} onChange={e=>setMonsterWis(e.target.value)} class="inputBox"/>
              </label>
            </div>
            <div>
              <label>
                CHA: 
                <input value={monsterCha} onChange={e=>setMonsterCha(e.target.value)} class="inputBox"/>
              </label>
            </div>
            
            <input type="submit" value="Submit" class="submitBox"/>
          </form>
        </div>
        
        <div class="column">
        <h1>Create an Item</h1>
        <form onSubmit={addItem}>
        
            <div>
              <label>
                Name: 
                <input type="text" value={itemName} onChange={e => setItemName(e.target.value)} class="inputBox"/>
              </label>
            </div>
            <div>
              <label>
                Description: 
                <input value={itemDescription} onChange={e=>setItemDescription(e.target.value)} class="inputBox"/>
              </label>
            </div>
            
            <input type="submit" value="Submit" class="submitBox"/>
          </form>
        </div>
        
      </div>
      
      
      <div class="row">
        <div class="column">
          <h1>Characters</h1>
          {characters.map( character => (
            <div key={character.id} className="character" class="characterBlock">
              
              <h3>Name: {character.name}</h3>
              <p>Class: {character.characterClass}</p>
              <p>Race: {character.race}</p>
              <p>Level: {character.lvl}</p>
              <p>STR: {character.str}</p>
              <p>DEX: {character.dex}</p>
              <p>CON: {character.con}</p>
              <p>INT: {character.int}</p>
              <p>WIS: {character.wis}</p>
              <p>CHA: {character.cha}</p>
              
              <button onClick={e => decrementLvl(character)}>-</button>
              <button onClick={e => incrementLvl(character)}>+</button>
              <button onClick={e => deleteCharacter(character)}>Delete</button>
            </div>
          ))}  
        </div>
        
        <div class="column">
          <h1>Monsters</h1>
          {monsters.map( monster => (
            <div key={monster.id} className="monster" class="monsterBlock">
              
              <h3>Name: {monster.name}</h3>
              <p>Armor class: {monster.ac}</p>
              <p>Hit points: {monster.hp}</p>
              <p>STR: {monster.str}</p>
              <p>DEX: {monster.dex}</p>
              <p>CON: {monster.con}</p>
              <p>INT: {monster.int}</p>
              <p>WIS: {monster.wis}</p>
              <p>CHA: {monster.cha}</p>
              
              <button onClick={e => deleteMonster(monster)}>Delete</button>
            </div>
          ))}  
        </div>
        
        <div class="column">
          <h1>Items</h1>
          {items.map( item => (
            <div key={item.id} className="item" class="itemBlock">
              
              <h3>Name: {item.name}</h3>
              <p>Description: {item.itemDescription}</p>
              
              <button onClick={e => deleteItem(item)}>Delete</button>
            </div>
          ))}  
        </div>
      </div>
      <br></br><br></br><br></br>
      
      
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import { FiPlus, FiSearch } from 'react-icons/fi';

import { useNavigate } from 'react-router-dom';
import { ButtonText } from '../../components/buttonText';
import { Header } from '../../components/header';
import { Input } from '../../components/input';
import { Note } from '../../components/note';
import { Section } from '../../components/section';
import { api } from '../../services/api';
import { Brand, Container, Content, Menu, NewNote, Search } from './styles';

export function Home() {
  const [tags, setTags] = useState([]);
  const [tagsSelected, setTagsSelected] = useState([]);

  const [search, setSearch] = useState("");

  const [notes, setNotes] = useState([]);
  
  const navigate = useNavigate();

  function handleTagSelected(tagName) {
    const alreadySelected = tagsSelected.includes(tagName);

    if(tagName === 'all') {
      return setTagsSelected([]);
    }

    if(alreadySelected) {
      const filteredTags = tagsSelected.filter(tag => tag !== tagName);
      setTagsSelected(filteredTags);
    } else {
      setTagsSelected(prevState => [...prevState, tagName]);
    }
  }

  function handleDetails(id) {
    navigate(`/details/${id}`);
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get('/tags');
      setTags(response.data);
    }
    fetchTags();
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`);
      setNotes(response.data);
    }
    fetchNotes();
  }, [tagsSelected, search]);

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText 
            title="Todos" 
            onClick={() => handleTagSelected('all')} 
            $isactive={tagsSelected.length === 0} 
          />
        </li>
        {
          tags && tags.map(tag => (
            <li key={String(tag.id)}>
              <ButtonText 
                title={tag.name} 
                onClick={() => handleTagSelected(tag.name)} 
                $isactive={tagsSelected.includes(tag.name)} 
              />
              </li>
          ))
        }
      </Menu>

      <Search>
        <Input 
          placeholder="Pesquisar pelo título"
          icon={FiSearch}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {
            notes.map(note => (
              <Note 
                data={note} 
                key={String(note.id)}
                onClick={() => handleDetails(note.id)}
              />
            ))
          }
        </Section>
      </Content>

      <NewNote to='/new'>
        <FiPlus/>
        Criar Nota
      </NewNote>

    </Container>
  );
}
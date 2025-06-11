import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { NoteItem } from "../../components/noteItem";
import { Section } from "../../components/section";
import { TextArea } from "../../components/textArea";
import { api } from "../../services/api";
import { Container, Form } from "./styles";
import { ButtonText } from "../../components/buttonText";

export function New() {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTags, setNewTags] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  function handleAddLink() {
    setLinks(prevState => [...prevState, newLink]);
    setNewLink("");
  }

  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter(link => link !== deleted));
  }

  function handleAddTag() {
    setTags(prevState => [...prevState, newTags]);
    setNewTags("");
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter(tag => tag !== deleted));
  }

  async function handleNewNote() {
    if(!title) {
      return alert("Preencha o campo de titulo!");
    }

    if(newLink) {
      return alert("Você deixou um link no campo para adicionar, mas nenhum foi adicionado. Clique para adicionar ou deixe o campo vazio");
    }

    if(newTags) {
      return alert("Você deixou uma tag no campo para adicionar, mas nenhuma foi adicionada. Clique para adicionar ou deixe o campo vazio");
    }

    await api.post("/notes", {
      title,
      description,
      links,
      tags
    });

    alert("Nota criada com sucesso!");

    navigate(-1);
  };

  return (
    <Container>
      <Header />
      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <ButtonText title="Voltar" onClick={() => navigate(-1)}/>
          </header>

          <Input placeholder="Titulo" onChange={e => setTitle(e.target.value)} />
          <TextArea placeholder="Observações" onChange={e => setDescription(e.target.value)}/>

          <Section title="Links úteis">
            {
              links.map((link, index) => (
                <NoteItem 
                  value={link}
                  onClick={() => handleRemoveLink(link)}
                  key={String(index)}
                />
              ))
            }
            <NoteItem 
              isNew
              placeholder="Novo link"
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores">
            <div className="tags">
              {
                tags.map((tag, index) => (
                  <NoteItem 
                    value={tag}
                    key={String(index)}
                    onClick={() => handleRemoveTag(tag)}
                  />
                ))
              }

              <NoteItem 
                isNew={true} 
                placeholder="Nova tag"
                onChange={e => setNewTags(e.target.value)}
                value={newTags}
                onClick={handleAddTag}
              />
              
            </div>
          </Section>
          <Button title="Salvar" onClick={handleNewNote} />
        </Form>
      </main>
    </Container>
  );
}
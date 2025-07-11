import { Container, Links, Content } from "./styles";
import { Header } from '../../components/header';
import { Section } from '../../components/section';
import { ButtonText } from '../../components/buttonText';
import { Button } from '../../components/button';
import { Tag } from '../../components/tag';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../../services/api";

export function Details() {
  const [data, setData] = useState(null);

  const params = useParams();

  const navigate = useNavigate();

  function handleBack() {
    navigate("/")
  }

  function handleRemove() {
    const confirm = window.confirm("Deseja realmente excluir essa nota?");

    if (confirm) {
      api.delete(`/notes/${params.id}`);
      navigate("/");
    }
  }

  function handleBack() {
    navigate(-1);
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data, console.log(response.data));
    }

    fetchNote();
  }, []);

  return (
    <>
      <Container>
        <Header />

        { 
          data &&
          <main>
            <Content>
              <ButtonText title="Excluir nota" onClick={handleRemove} />

              <h1>{data.title}</h1>

              <p>
                {data.description}
              </p>

              { 
                data.links &&
                <Section title="Links úteis">
                  <Links>
                    {
                        data.links.map(link => (
                        <li key={String(link.id)}><a href={link.url} target="_blank">{link.url}</a></li>
                        ))
                    }
                  </Links>
                </Section>
              }

              { 
                data.tags &&
                <Section title="Marcadores">
                  {
                    data.tags.map(tag => <Tag key={String(tag.id)} title={tag.name} />)
                  }
                </Section>
              }
        
              <Button title="Voltar" onClick={handleBack} />
            </Content>
          </main>
        }
      </Container>
    </>
  )
}

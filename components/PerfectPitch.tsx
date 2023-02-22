import { Form, Button, Spinner } from "react-bootstrap";
import { FormEvent, useState } from "react";
import styles from "@/styles/Home.module.css";
import book from "@/assets/images/book.jpg";
import Image from "next/image";

export const PitchPerfect = () => {
  const [pitch, setPitch] = useState("");
  const [pitchLoading, setPitchLoading] = useState(false);
  const [pitchError, setPitchError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const prompt = formData.get("prompt").toString().trim();
    if (prompt) {
      try {
        setPitch("");
        setPitchError(false);
        setPitchLoading(true);
        const response = await fetch(
          "/api/pitch?prompt=" + encodeURIComponent(prompt)
        );
        const body = await response.json();
        setPitch(body.pitch);
      } catch (error) {
        console.error(error);
        setPitchError(true);
      } finally {
        setPitchLoading(false);
      }
    }
  }
  return (
    <>
      <div className={styles.mainContainer}>
        <h1>Bem-vindo ao criador de Roteiros Pessoais!</h1>
        <p>
          Para obter um roteiro personalizado, por favor, siga as instruções
          abaixo:
        </p>
        <ol>
          <li>
            Insira o objetivo do roteiro (por exemplo, planejamento de estudos,
            organização de tarefas, desenvolvimento pessoal, etc.);
          </li>
          <li>
            Insira o prazo que você tem disponível para concluir o roteiro;
          </li>
          <li>
            Insira as principais etapas que você precisa realizar para alcançar
            seu objetivo;
          </li>
          <li>
            Insira suas preferências de abordagem (por exemplo, técnica de
            pomodoro, organização por prioridades, uso de aplicativos, etc.);
          </li>
          <li>
            Se desejar, você pode inserir outras informações relevantes para a
            criação do roteiro, como seu perfil profissional, áreas de
            interesse, recursos disponíveis, etc.
          </li>
        </ol>

        <p>
          Com base nas informações fornecidas, o chatbot criará um roteiro
          personalizado para te ajudar a alcançar seus objetivos pessoais. Caso
          precise de ajuda ou tenha alguma dúvida, basta digitar "ajuda" no
          campo de mensagem.
        </p>
      </div>
      {pitchLoading && <Spinner animation="border" />}
      {pitchError && "Algo deu errado, porfavor tente novamente!"}
      {pitch && <h5 className={styles.mensagem}>{pitch}</h5>}
      <Form onSubmit={handleSubmit} className={styles.inputForm}>
        <Form.Group className="mb-3" controlId="prompt-input">
          <Form.Control
            as="textarea"
            rows={5}
            name="prompt"
            placeholder="ex: eu sou um desenvolvedor iniciante"
            maxLength={1000}
          />
        </Form.Group>
        <Button type="submit" disabled={pitchLoading}>
          Crie meu roteiro pessoal
        </Button>
      </Form>
    </>
  );
};

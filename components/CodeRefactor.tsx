import { Form, Button, Spinner } from "react-bootstrap";
import "@picocss/pico";

import { FormEvent, useState } from "react";
import styles from "@/styles/Home.module.css";
import book from "@/assets/images/book.jpg";
import Image from "next/image";

export const CodeRefactor = () => {
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const promptValue = formData.get("prompt");
    const prompt = promptValue ? promptValue.toString().trim() : "";
    if (prompt) {
      try {
        setCode("");
        setCodeError(false);
        setCodeLoading(true);
        const response = await fetch(
          "/api/code?prompt=" + encodeURIComponent(prompt)
        );
        const body = await response.json();
        setCode(body.code);
      } catch (error) {
        console.error(error);
        setCodeError(true);
        setCode((error as Error).message);
      } finally {
        setCodeLoading(false);
      }
    }
  }
  return (
    <>
      <div className={styles.mainContainer}>
        <h1>Bem-vindo ao Organizador de Rotina!</h1>
        <p>
          Para organizar sua rotina com base nos dados fornecidos, por favor,
          siga as instruções abaixo:
        </p>
        <ol>
          <li>Insira o seu horário de acordar e dormir;</li>
          <li>
            Insira as atividades que você precisa realizar diariamente, como
            trabalho, estudos, exercícios, refeições, etc.;
          </li>
          <li>
            Insira o tempo que você precisa dedicar a cada uma das atividades
            diárias;
          </li>
          <li>
            Insira suas preferências de horários para cada atividade (por
            exemplo, preferência por realizar exercícios pela manhã, estudos à
            tarde, etc.);
          </li>
          <li>
            Se desejar, você pode inserir outras informações relevantes para a
            organização da sua rotina, como sua localização, a duração do seu
            trajeto até o trabalho ou escola, entre outros.
          </li>
        </ol>

        <p>
          Com base nas informações fornecidas, o chatbot criará uma rotina
          personalizada para te ajudar a manter uma organização mais eficiente e
          produtiva. Caso precise de ajuda ou tenha alguma dúvida, basta digitar
          &quot;ajuda&quot; no campo de mensagem.
        </p>
      </div>
      {codeLoading && <Spinner animation="border" />}
      {codeError && "Algo deu errado, porfavor tente novamente!"}
      {code && (
        <div>
          <h5 className={styles.mensagem}>Sua rotina:</h5>
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      )}
      <Form onSubmit={handleSubmit} className={styles.inputForm}>
        <Form.Group className="mb-3" controlId="prompt-input">
          <Form.Control
            as="textarea"
            rows={5}
            name="prompt"
            placeholder="ex: café da manha, 2 horas de trabalho, 2 horas de estudo"
            maxLength={8000}
          />
        </Form.Group>
        <Button type="submit" disabled={codeLoading}>
          Crie minha rotina
        </Button>
      </Form>
    </>
  );
};

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
      <div className={styles.mainImageContainer}>
        <Image src={book} alt="um livro aberto" className={styles.mainImage} />
      </div>
      {pitchLoading && <Spinner animation="border" />}
      {pitchError && "Algo deu errado, porfavor tente novamente!"}
      {pitch && <h5 className={styles.mensagem}>{pitch}</h5>}
      <Form onSubmit={handleSubmit} className={styles.inputForm}>
        <Form.Group className="mb-3" controlId="prompt-input">
          <Form.Label>Fale um pouco sobre voce</Form.Label>
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

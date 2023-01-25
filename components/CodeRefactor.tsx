import { Form, Button, Spinner } from "react-bootstrap";
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
    const prompt = formData.get("prompt").toString().trim();
    if (prompt) {
      try {
        setCode("");
        setCodeError(false);
        setCodeLoading(true);
        const response = await fetch(
          "/api/code?prompt=" + encodeURIComponent(prompt)
        );
        const body = await response.json();
        if (!response.ok) {
          throw new Error(body.error);
        }
        setCode(body.code);
      } catch (error) {
        console.error(error);
        setCodeError(true);
        setCode(error.message);
      } finally {
        setCodeLoading(false);
      }
    }
  }
  return (
    <>
      <div className={styles.mainImageContainer}>
        <Image src={book} alt="um livro aberto" className={styles.mainImage} />
      </div>
      {codeLoading && <Spinner animation="border" />}
      {codeError && "Algo deu errado, porfavor tente novamente!"}
      {code && <h5 className={styles.mensagem}>{code}</h5>}
      <Form onSubmit={handleSubmit} className={styles.inputForm}>
        <Form.Group className="mb-3" controlId="prompt-input">
          <Form.Label>Insira seu codigo</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            name="prompt"
            placeholder="ex: meu codigo"
            maxLength={8000}
          />
        </Form.Group>
        <Button type="submit" disabled={codeLoading}>
          Crie meu roteiro pessoal
        </Button>
      </Form>
    </>
  );
};

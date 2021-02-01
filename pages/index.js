import styled from "styled-components";
import { useRouter } from "next/router";

import db from "../db.json";
import Widget from "../src/components/Widget";
import Link from "../src/components/Link";
import QuizBackground from "../src/components/QuizBackground/index";
import Footer from "../src/components/Footer/index";
import QuizLogo from "../src/components/QuizLogo/index";
import GitHubCorner from "../src/components/GitHubCorner/index";
import Input from "../src/components/Input/index";
import Button from "../src/components/Button/index";
import QuizContainer from "../src/components/QuizContainer/index";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState("");
  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: "0" },
            hidden: { opacity: 0, y: "100%" },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Musical Quiz &nbsp;\m/</h1>
          </Widget.Header>
          <Widget.Content>
            <p>{db.description}</p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                router.push(`/quiz?name=${name}`);
              }}
            >
              <Input
                name="nomeDoUsuario"
                placeholder="Insira o seu nome para jogar :D"
                onChange={(event) => {
                  setName(event.target.value);
                }}
                value={name}
              ></Input>
              <Button type="submit" disabled={name.length === 0}>
                Jogar
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes dos outros Devs:</h1>
            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, "")
                  .replace("https:", "")
                  .replace(".vercel.app", "")
                  .split(".");
                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                      style={{ textDecoration: "none" }}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      <GitHubCorner />
    </QuizBackground>
  );
}

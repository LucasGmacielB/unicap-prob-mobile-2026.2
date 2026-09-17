import { useState } from "react";
import { View, Text, Pressable, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import { Dado } from "./Dado";

type Resultado = "j1" | "j2" | "empate";

type Rodada = {
  j1: [number, number];
  j2: [number, number];
  resultado: Resultado;
};

const TOTAL_RODADAS = 5;

export const JogoDados = () => {
  const [rodada, setRodada] = useState(1);
  const [vezJ1, setVezJ1] = useState(true);
  const [dadosJ1, setDadosJ1] = useState<[number, number]>([0, 0]);
  const [dadosJ2, setDadosJ2] = useState<[number, number]>([0, 0]);
  const [historico, setHistorico] = useState<Rodada[]>([]);
  const [finalizado, setFinalizado] = useState(false);
  const [resultadoRodada, setResultadoRodada] = useState<Resultado | null>(
    null
  );

  const rolar = () =>
    [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1,
    ] as [number, number];

  const soma = (dados: [number, number]) => dados[0] + dados[1];

  const somaTotalJ1 = () =>
    historico.reduce((total, r) => total + soma(r.j1), 0);

  const somaTotalJ2 = () =>
    historico.reduce((total, r) => total + soma(r.j2), 0);

  const jogarJ1 = () => {
    const dados = rolar();
    setDadosJ1(dados);
    setResultadoRodada(null);
    setVezJ1(false);
  };

  const jogarJ2 = () => {
    const dados = rolar();
    setDadosJ2(dados);

    const s1 = soma(dadosJ1);
    const s2 = soma(dados);
    let resultado: Resultado = s1 > s2 ? "j1" : s1 < s2 ? "j2" : "empate";
    setResultadoRodada(resultado);

    const novoHistorico = [...historico, { j1: dadosJ1, j2: dados, resultado }];
    setHistorico(novoHistorico);

    if (rodada === TOTAL_RODADAS) {
      setFinalizado(true);
    } else {
      setRodada((r) => r + 1);
      setVezJ1(true);
    }
  };

  const reiniciar = () => {
    setRodada(1);
    setVezJ1(true);
    setDadosJ1([0, 0]);
    setDadosJ2([0, 0]);
    setHistorico([]);
    setFinalizado(false);
    setResultadoRodada(null);
  };

  const vencedorFinal = () => {
    const j1 = historico.filter((r) => r.resultado === "j1").length;
    const j2 = historico.filter((r) => r.resultado === "j2").length;
    if (j1 > j2) return "Parabéns, o jogador 1 venceu a partida";
    if (j2 > j1) return "Parabéns, o jogador 2 venceu a partida";
    return "Empate geral!";
  };

  return (
    <SafeAreaView style={styles.tela}>
      <ScrollView style={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.cabecalho}>
          <Text style={styles.titulo}>Jogo dos Dados</Text>
          {!finalizado && (
            <Text style={styles.subtitulo}>
              Rodada {rodada} de {TOTAL_RODADAS}
            </Text>
          )}
        </View>

        {/* Cards dos jogadores */}
        <View style={styles.listaJogadores}>
          {/* Jogador 1 */}
          <View
            style={[
              styles.card,
              vezJ1 && !finalizado ? styles.cardAtivoAzul : styles.cardInativo,
            ]}
          >
            <Text style={[styles.nomeJogador, styles.corAzul]}>Jogador 1</Text>

            <View style={styles.linhaDados}>
              <Dado valor={dadosJ1[0]} />
              <Dado valor={dadosJ1[1]} />
            </View>

            <Text style={styles.infoSoma}>
              Soma: {soma(dadosJ1)}   •   Total: {somaTotalJ1()}
            </Text>

            <Pressable
              onPress={jogarJ1}
              disabled={!vezJ1 || finalizado}
              style={({ pressed }) => [
                styles.botao,
                !vezJ1 || finalizado ? styles.botaoAzulDesativado : styles.botaoAzul,
                pressed && styles.botaoPressionado,
              ]}
            >
              <Text style={styles.textoBotao}>Jogar</Text>
            </Pressable>
          </View>

          {/* Jogador 2 */}
          <View
            style={[
              styles.card,
              !vezJ1 && !finalizado ? styles.cardAtivoVerde : styles.cardInativo,
            ]}
          >
            <Text style={[styles.nomeJogador, styles.corVerde]}>Jogador 2</Text>

            <View style={styles.linhaDados}>
              <Dado valor={dadosJ2[0]} />
              <Dado valor={dadosJ2[1]} />
            </View>

            <Text style={styles.infoSoma}>
              Soma: {soma(dadosJ2)}   •   Total: {somaTotalJ2()}
            </Text>

            <Pressable
              onPress={jogarJ2}
              disabled={vezJ1 || finalizado}
              style={({ pressed }) => [
                styles.botao,
                vezJ1 || finalizado ? styles.botaoVerdeDesativado : styles.botaoVerde,
                pressed && styles.botaoPressionado,
              ]}
            >
              <Text style={styles.textoBotao}>Jogar</Text>
            </Pressable>
          </View>
        </View>

        {/* Resultado da rodada */}
        {resultadoRodada && (
          <View style={styles.blocoResultadoRodada}>
            <Text style={styles.textoResultadoRodada}>
              {resultadoRodada === "j1" && "O jogador 1 ganhou a rodada: " + rodada}
              {resultadoRodada === "j2" && "O jogador 2 ganhou a rodada: " + rodada}
              {resultadoRodada === "empate" && "Empate!"}
            </Text>
          </View>
        )}

        {/* Resultado final */}
        {finalizado && (
          <View style={styles.blocoFinal}>
            <Text style={styles.textoVencedor}>{vencedorFinal()}</Text>

            <Pressable
              onPress={reiniciar}
              style={({ pressed }) => [
                styles.botaoReiniciar,
                pressed && styles.botaoPressionado,
              ]}
            >
              <Text style={styles.textoBotao}>Jogar Novamente</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  cabecalho: {
    alignItems: "center",
    marginBottom: 16,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1e293b",
  },
  subtitulo: {
    fontSize: 16,
    color: "#64748b",
    marginTop: 4,
  },
  listaJogadores: {
    gap: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardAtivoAzul: {
    borderColor: "#60a5fa",
  },
  cardAtivoVerde: {
    borderColor: "#4ade80",
  },
  cardInativo: {
    borderColor: "transparent",
  },
  nomeJogador: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  corAzul: {
    color: "#2563eb",
  },
  corVerde: {
    color: "#16a34a",
  },
  linhaDados: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 8,
  },
  infoSoma: {
    textAlign: "center",
    color: "#475569",
    marginBottom: 12,
  },
  botao: {
    paddingVertical: 12,
    borderRadius: 12,
  },
  botaoAzul: {
    backgroundColor: "#3b82f6",
  },
  botaoAzulDesativado: {
    backgroundColor: "#bfdbfe",
  },
  botaoVerde: {
    backgroundColor: "#22c55e",
  },
  botaoVerdeDesativado: {
    backgroundColor: "#bbf7d0",
  },
  botaoPressionado: {
    opacity: 0.7,
  },
  textoBotao: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  blocoResultadoRodada: {
    marginTop: 16,
    alignItems: "center",
  },
  textoResultadoRodada: {
    fontSize: 16,
    fontWeight: "500",
    color: "#334155",
    backgroundColor: "#e2e8f0",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
  },
  blocoFinal: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 18,
    backgroundColor: "#f3e8ff",
    borderRadius: 16,
    padding: 20,
  },
  textoVencedor: {
    fontSize: 20,
    fontWeight: "800",
    color: "#7e22ce",
    textAlign: "center",
  },
  botaoReiniciar: {
    backgroundColor: "#a855f7",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 16,
  },
});
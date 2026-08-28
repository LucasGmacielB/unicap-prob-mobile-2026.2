import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

export default function Index() {
  const [idade, setIdade] = useState("");
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [resultado, setResultado] = useState("");

  function calcularAnoNascimento() {
    const idadeNumero = Number(idade);
    const diaNumero = Number(dia);
    const mesNumero = Number(mes);

    // Verifica se os campos foram preenchidos
    if (!idade || !dia || !mes) {
      setResultado("Preencha todos os campos.");
      return;
    }

    // Verifica se os valores são válidos
    if (
      idadeNumero < 0 ||
      diaNumero < 1 ||
      diaNumero > 31 ||
      mesNumero < 1 ||
      mesNumero > 12
    ) {
      setResultado("Digite valores válidos.");
      return;
    }

    const dataAtual = new Date();

    const anoAtual = dataAtual.getFullYear();
    const mesAtual = dataAtual.getMonth() + 1;
    const diaAtual = dataAtual.getDate();

    let anoNascimento = anoAtual - idadeNumero;

    // Se a pessoa ainda não fez aniversário neste ano,
    // significa que nasceu um ano antes.
    if (
      mesNumero > mesAtual ||
      (mesNumero === mesAtual && diaNumero > diaAtual)
    ) {
      anoNascimento--;
    }

    setResultado(`Seu ano de nascimento é ${anoNascimento}.`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Calculadora de Ano de Nascimento
      </Text>

      <Text style={styles.label}>Sua idade:</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite sua idade"
        keyboardType="numeric"
        value={idade}
        onChangeText={setIdade}
      />

      <Text style={styles.label}>Dia de nascimento:</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 15"
        keyboardType="numeric"
        value={dia}
        onChangeText={setDia}
        maxLength={2}
      />

      <Text style={styles.label}>Mês de nascimento:</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex: 8"
        keyboardType="numeric"
        value={mes}
        onChangeText={setMes}
        maxLength={2}
      />

      <Pressable
        style={styles.botao}
        onPress={calcularAnoNascimento}
      >
        <Text style={styles.textoBotao}>Calcular</Text>
      </Pressable>

      {resultado !== "" && (
        <Text style={styles.resultado}>
          {resultado}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f5f5f5",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
  },

  botao: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  textoBotao: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },

  resultado: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 30,
  },
});
import type { TaskPriority } from "@loop/types";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, TextInput } from "react-native";
import { Pressable, ScrollView, Text, View } from "react-native-css/components";
import { SafeAreaView } from "react-native-safe-area-context";

import { useTaskFlow } from "./hooks/use-task-flow";

const priorityOptions: { label: string; value: TaskPriority }[] = [
  { label: "Baixa", value: "LOW" },
  { label: "Média", value: "MEDIUM" },
  { label: "Alta", value: "HIGH" },
];

export function CreateTaskScreen() {
  const { createTask } = useTaskFlow();
  const [title, setTitle] = useState("");
  const [estimatedMinutes, setEstimatedMinutes] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("MEDIUM");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSave() {
    const parsedMinutes = Number(estimatedMinutes);
    const parsedDeadline = deadline
      ? new Date(`${deadline}T23:59:59`)
      : undefined;

    if (!title.trim()) {
      setError("Informe o título da tarefa.");
      return;
    }

    if (!Number.isInteger(parsedMinutes) || parsedMinutes <= 0) {
      setError("Informe um tempo estimado válido em minutos.");
      return;
    }

    if (parsedDeadline && Number.isNaN(parsedDeadline.getTime())) {
      setError("Informe o prazo no formato AAAA-MM-DD.");
      return;
    }

    setIsSubmitting(true);
    setError(undefined);
    try {
      await createTask({
        title: title.trim(),
        estimatedMinutes: parsedMinutes,
        priority,
        deadline: parsedDeadline,
      });
      router.back();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Não foi possível criar a tarefa.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <View className="flex-1 bg-loop-background">
      <SafeAreaView edges={["top", "bottom"]} className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1"
        >
          <ScrollView
            className="flex-1 px-6 pt-8"
            contentContainerStyle={{ paddingBottom: 32 }}
            keyboardShouldPersistTaps="handled"
          >
            <Text className="font-loop-bold text-3xl tracking-[-0.8px] text-loop-text-primary">
              Nova tarefa
            </Text>
            <Text className="mt-3 font-loop-regular text-base text-loop-text-secondary">
              Adicione apenas o necessário para o Loop decidir bem.
            </Text>

            <View className="mt-8 gap-5">
              <FormField
                label="Título"
                placeholder="Revisar cálculo"
                value={title}
                onChangeText={setTitle}
              />
              <FormField
                keyboardType="number-pad"
                label="Tempo estimado (min)"
                placeholder="30"
                value={estimatedMinutes}
                onChangeText={setEstimatedMinutes}
              />

              <View>
                <Text className="mb-2 font-loop-medium text-sm text-loop-text-secondary">
                  Prioridade
                </Text>
                <View className="flex-row gap-3">
                  {priorityOptions.map((option) => (
                    <Pressable
                      key={option.value}
                      accessibilityRole="radio"
                      accessibilityState={{ selected: priority === option.value }}
                      className={`flex-1 items-center rounded-loop-lg border py-4 ${
                        priority === option.value
                          ? "border-loop-primary bg-loop-primary/15"
                          : "border-loop-border bg-loop-surface"
                      }`}
                      onPress={() => setPriority(option.value)}
                    >
                      <Text
                        className={`font-loop-semibold text-sm ${
                          priority === option.value
                            ? "text-loop-primary"
                            : "text-loop-text-primary"
                        }`}
                      >
                        {option.label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <FormField
                label="Prazo opcional"
                placeholder="AAAA-MM-DD"
                value={deadline}
                onChangeText={setDeadline}
              />
            </View>

            {error ? (
              <Text
                accessibilityRole="alert"
                className="mt-5 font-loop-medium text-sm text-red-500"
              >
                {error}
              </Text>
            ) : null}

            <Pressable
              accessibilityRole="button"
              accessibilityState={{ disabled: isSubmitting }}
              className={`mt-8 min-h-14 items-center justify-center rounded-loop-lg bg-loop-primary ${isSubmitting ? "opacity-60" : "active:opacity-80"}`}
              disabled={isSubmitting}
              onPress={() => void handleSave()}
            >
              <Text className="font-loop-semibold text-base text-loop-text-inverse">
                {isSubmitting ? "Salvando..." : "Salvar tarefa"}
              </Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              className="mt-3 items-center py-3"
              onPress={() => router.back()}
            >
              <Text className="font-loop-semibold text-base text-loop-text-secondary">
                Cancelar
              </Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

type FormFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  keyboardType?: "default" | "number-pad";
};

function FormField({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
}: FormFieldProps) {
  return (
    <View>
      <Text className="mb-2 font-loop-medium text-sm text-loop-text-secondary">
        {label}
      </Text>
      <TextInput
        accessibilityLabel={label}
        className="h-14 rounded-loop-lg border border-loop-border bg-loop-surface px-4 font-loop-regular text-base text-loop-text-primary"
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#71717A"
        value={value}
      />
    </View>
  );
}

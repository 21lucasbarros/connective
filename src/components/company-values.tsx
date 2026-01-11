import {
  Target,
  Eye,
  Star,
  Triangle,
  Heart,
  Search,
  Lightbulb,
  TrendingUp,
  Shield,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function CompanyValues() {
  const values = [
    {
      icon: Triangle,
      title: "Estratégia antes da estética",
      description:
        "Acreditamos que toda criação precisa de intenção, direção e fundamento estratégico.",
      color: "text-orange-500",
    },
    {
      icon: Heart,
      title: "Conexão humana",
      description:
        "Valorizamos relações reais, atendimento próximo e construção conjunta com nossos clientes.",
      color: "text-pink-500",
    },
    {
      icon: Search,
      title: "Clareza e transparência",
      description:
        "Comunicação direta, processos claros e alinhamento em todas as etapas do projeto.",
      color: "text-purple-500",
    },
    {
      icon: Lightbulb,
      title: "Criatividade com propósito",
      description:
        "Criamos não apenas para ser bonito, mas para fazer senindo e gerar valor.",
      color: "text-yellow-500",
    },
    {
      icon: TrendingUp,
      title: "Compromisso com o crescimento",
      description:
        "Cada projeto é tratado como parte da nossa própria história, com responsabilidade e visão de longo prazo.",
      color: "text-blue-500",
    },
    {
      icon: Shield,
      title: "Autenticidade",
      description:
        "Respeitamos a essência de cada marca, sem fórmulas prontas ou soluções genéricas.",
      color: "text-teal-500",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Missão, <span className="text-purple-600">Visão</span> e Valores
          </h1>
          <div className="w-32 h-1 bg-linear-to-r from-purple-400 via-pink-400 to-orange-400 mx-auto rounded-full"></div>
        </div>

        {/* Missão */}
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-linear-to-br from-purple-500 to-pink-500 rounded-full">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">Missão</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Conectar{" "}
              <span className="font-semibold text-purple-600">
                marcas à sua essência
              </span>{" "}
              por meio de{" "}
              <span className="font-semibold text-purple-600">
                estratégia, criatividade e identidade visual
              </span>
              , ajudando empresas a se posicionarem com clareza, propósito e
              consistência no{" "}
              <span className="font-semibold text-purple-600">
                ambiente digital
              </span>
              .
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nossa missão é transformar ideias em marcas estruturadas, humanas
              e autênticas, oferecendo soluções criativas que fazem sentido para
              o momento e os objetivos de cada cliente.
            </p>
          </CardContent>
        </Card>

        {/* Visão */}
        <Card className="mb-12 shadow-lg border-0 bg-white/80 backdrop-blur">
          <CardContent className="p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-linear-to-br from-blue-500 to-purple-500 rounded-full">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">Visão</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Ser reconhecida como uma{" "}
              <span className="font-semibold text-blue-600">
                agência criativa
              </span>{" "}
              referência em{" "}
              <span className="font-semibold text-blue-600">
                branding e estratégia digital
              </span>
              , conhecida por construir marcas sólidas, bem posicionadas e
              preparadas para crescer de forma estruturada e sustentável.
            </p>
            <p className="text-gray-600 leading-relaxed">
              A Connective busca crescer junto com seus clientes, mantendo a{" "}
              <span className="font-semibold">proximidade</span>, a qualidade
              estratégica e a sensibilidade criativa como pilares de cada
              projeto.
            </p>
          </CardContent>
        </Card>

        {/* Valores */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-linear-to-br from-orange-500 to-pink-500 rounded-full">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Valores</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="shadow-lg border-0 bg-white/80 backdrop-blur hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`p-2.5 bg-gray-100 rounded-lg ${value.color}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-12">
          <div className="w-2 h-2 rounded-full bg-orange-400"></div>
          <div className="w-2 h-2 rounded-full bg-purple-400"></div>
          <div className="w-2 h-2 rounded-full bg-teal-400"></div>
        </div>
      </div>
    </div>
  );
}

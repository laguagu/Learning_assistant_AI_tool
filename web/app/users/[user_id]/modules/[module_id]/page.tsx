import { BackButton } from "@/components/buttons";
import { ModuleContentAccordion } from "@/components/module-content-accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getModuleContent } from "@/lib/data/study-plans";
import { isModuleEnabled } from "@/lib/features";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ user_id: string; module_id: string }>;
}) {
  const { user_id, module_id } = await params;
  const decodedUserId = decodeURIComponent(user_id);

  // Tarkista moduulin käyttöoikeus
  const moduleNumber = parseInt(module_id.replace("module", ""));
  if (!isModuleEnabled(moduleNumber)) {
    redirect("/");
  }

  // Hae moduulin sisältö
  const moduleContent = getModuleContent(decodedUserId, module_id);

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Image
        src="/upbeat-logo-1.png"
        alt="Upbeat Logo"
        width={200}
        height={100}
        priority
        className="relative z-10 mx-auto mb-8 rounded-md drop-shadow-xl"
        style={{
          filter:
            "drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5)) drop-shadow(0px 0px 5px rgba(66, 133, 244, 0.5))",
        }}
      />

      <div className="mb-12">
        <Card className="shadow-sm">
          <CardHeader className="bg-primary/5 border-b border-primary/10 py-6 flex flex-row items-center justify-between">
            <div className="flex items-center">
              <BackButton />
            </div>
            <CardTitle className="text-2xl text-center flex-1">
              {moduleContent.title}
            </CardTitle>
            <div className="w-[40px]"></div> {/* Spacer for balance */}
          </CardHeader>
          <CardContent className="py-6 px-6 md:px-8 lg:px-10">
            <div className="my-4 mx-auto">
              <ModuleContentAccordion
                moduleContent={moduleContent}
                defaultOpen={true}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

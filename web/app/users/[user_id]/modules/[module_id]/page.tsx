import { BackButton, CompleteButton } from "@/components/buttons";
import { ModuleContentAccordion } from "@/components/module-content-accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getModuleContent } from "@/lib/data/study-plans";
import { isModuleEnabled } from "@/lib/features";
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
      <div className="mb-6">
        <BackButton />
      </div>

      <div className="mb-12">
        <Card className="shadow-sm">
          <CardHeader className="bg-primary/5 border-b border-primary/10 py-6">
            <CardTitle className="text-2xl text-center">{moduleContent.title}</CardTitle>
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

        <div className="mt-8 flex justify-center md:justify-end">
          <CompleteButton email={user_id} module_id={module_id} />
        </div>
      </div>
    </div>
  );
}

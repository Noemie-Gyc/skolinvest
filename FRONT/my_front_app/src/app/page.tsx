import { DeleteButton } from "@/components/deleteButton";
import { SaveButton } from "@/components/saveButton";
import { AddButton } from "@/components/addButton";
import { StartButton } from "@/components/startButton";
import { CancelButton } from "@/components/cancelButton";
import { DiscoverButton } from "@/components/discoverButton";
import { NewsletterInput } from "@/components/newsletterInput";
import { EditBadge } from "@/components/editBadge";

export default function Page() {
  return (
     <main className = "h-screen flex flex-col gap-2 justify-center items-center">
      <form role = "souscrire à la newsletter">
        <NewsletterInput/>
      </form>
      <DeleteButton>Supprimer</DeleteButton>
      <br/><br/>
      <SaveButton>Enregistrer</SaveButton>
      <br/><br/>
      <AddButton>+ Section</AddButton>
      <br/><br/>
      <AddButton>+ Leçon</AddButton>
      <br/><br/>
      <StartButton>Commencer</StartButton>
      <br/><br/>
      <CancelButton>Annuler</CancelButton>
       <br/><br/>
      <DiscoverButton>Découvrir</DiscoverButton>
       <br/><br/>
         <span><EditBadge>EDITION</EditBadge></span>
    </main>  
  )
}
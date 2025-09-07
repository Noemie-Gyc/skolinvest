import { test, expect, request } from '@playwright/test';
import { slugify } from '../../src/lib/utils';

const testId = `e2e-${Date.now()}`;

const moduleTitle = `Module Test 1 ${testId}`;
const sectionTitle = `Section Test 1 ${testId}`;
const lessonTitle = `Lesson Test 1 ${testId}`;
const moduleTitle2 = `Module Test 2 ${testId}`;
const sectionTitle2 = `Section Test 2 ${testId}`;
const lessonTitle2 = `Lesson Test 2 ${testId}`;
const url = `https://www.youtube.com/watch?v=dQw4w9WgXcQ&testId=${testId}`;

test.beforeEach('authentication', async ({ page }) => {
    // Authentication part
    await page.goto('http://localhost:3000/admin-login');
    await expect(page.getByRole("heading", { name: "ESPACE ADMINISTRATEUR", level: 1 })).toBeVisible();
    await page.fill('#username', 'a.goyec');
    await page.fill('#password', 'adminalice');

    page.on('dialog', async (dialog) => {
        expect(dialog.message()).toContain('Connexion réussie !');
        await dialog.accept();
    });
    await Promise.all([
        page.waitForURL('http://localhost:3000/admin/modules'),
        page.getByRole('button', { name: 'Se connecter' }).click()
    ]);
    //moduleList access
    await expect(page).toHaveURL('http://localhost:3000/admin/modules');
});

test('module creation and completion', async ({ page }) => {
    await expect(page.getByRole("heading", { name: "MES MODULES", level: 1 })).toBeVisible({ timeout: 10000 });
    // loading of the link to add a new module
    const addButton = page.locator('a[href="/admin/modules/new"]');
    await expect(addButton).toBeVisible({ timeout: 10000 });
    await addButton.click();
    await expect(page).toHaveURL('http://localhost:3000/admin/modules/new');
    await expect(page.getByRole("heading", { name: "Nouveau module", level: 1 })).toBeVisible();
    // creation of a new module 
    await page.fill('#module-title', moduleTitle);
    await Promise.all([
        page.waitForURL(/\/admin\/modules\/\d+/),
        page.getByRole('button', { name: 'Ajouter' }).click(),
    ]);
    // redirection to the page edit module
    await expect(page).toHaveURL(/\/admin\/modules\/\d+/);
    // We must find the title we used in the add new module form
    await expect(page.getByTestId('editModule-title')).toHaveText(moduleTitle);
    // Create several sections - first one
    await page.getByTestId('new section').click();
    await page.fill('#section-title', sectionTitle);
    await page.getByTestId('save-section-button').click();
    await expect(page.getByTestId(`section-title-${slugify(sectionTitle)}`)).toBeVisible();
    // Second section
    await page.getByTestId('new section').click();
    await page.fill('#section-title', sectionTitle2 );
    await page.getByTestId('save-section-button').click();
    await expect(page.getByTestId(`section-title-${slugify(sectionTitle2)}`)).toBeVisible();
    // Create Lesson
    await page.getByTestId('new lesson').click();
    await page.fill('input[name="lesson-title"]', lessonTitle);
    // Select section the lesson belongs to
    const select = page.getByLabel('Section option');
    const option = select.locator('option').filter({ hasText: sectionTitle2 });
    const value = await option.first().getAttribute('value');
    await select.selectOption(value);
    // Add the video into the form
    await page.fill('input[name="url-video"]', url);
    //Save the lesson
    await page.getByTestId('save-lesson-button').click();
    // Check wheather lesson is in the proper section
    //TODO : Revoir cette partie qui ne fonctionne pas comme attendu
    // const sectionContainer = page.getByTestId(`section-title-${slugify(sectionTitle2)}`);
    // await expect(sectionContainer.getByTestId(`lesson-title-${slugify(lessonTitle)}`)).toBeVisible();
    // click on the My course manager link in the header to go back to the module list
    const myCourseManagerButton =  page.locator('a[href="/admin/modules"]');
    await expect(myCourseManagerButton).toBeVisible({ timeout: 10000 });
    await myCourseManagerButton.click();
    await expect(page).toHaveURL('http://localhost:3000/admin/modules');
    await expect(page.getByRole("heading", { name: "MES MODULES", level: 1 })).toBeVisible();
});

// test('edit module from module List', async ({ page }) => {
//     //Cliquer sur les trois petits points
//     //cliquer sur éditer 
//     //Vérifier qu'on arrive sur une page d'édition qui porte le même titre
//     // Modifier le titre
//     // enregistrer
//     // vérifier qu'il est bien visible dans le cardSummary
//     //Cliquer sur une section
//     //changer le titre
//     // Enregistrer
//     // Vérifier que le titre est bien à jour
//     //Cliquer sur une leçon
//     // Modifier le titre, 
//     // la vidéo, 
//     // la section
//     // Enregistrer
//     // Vérifier que les modifications sont bien prises en compte
//     // Vérifier que la leçon est dans la bonne section. 
//     // Supprimer la leçon
//     // Vérifier qu'elle n'est plus visible dans la liste des leçons
//     // Supprimer une section, faire un assert null
//     // Vérifier qu'elle n'est plus visible dans la liste des sections
//     // Retourner à la liste des modules
// });

// test('delete module', async ({ page }) => {
//     //aller sur le bouton supprimer du module créé précédemment
//     //Appuyer sur supprimer depuis la pop up
//     // Faire un assert null
//     // Vérifier que le nombre de modules a bien diminué de 1
// });

// test('module creation errors', async ({ page }) => {
//     //Essayer de créer un module sans titre
//     //Essayer de créer un module avec un titre de moins de 3 caractères
// });

// test('user without rights', async ({ page }) => {
//     //Déconnecter l'utilisateur admin
//     //Essayer de se connecter avec un utilisateur qui n'a pas les droits
//     //Vérifier que le message d'erreur s'affiche correctement
// });

// TODO : test accessibilité, éditer un module en utilisant que le keyboard. 

test.afterAll(async () => {
  const context = await request.newContext({
    extraHTTPHeaders: {
      'X-Cleanup-Token': 'secret',
    },
  });

  const url = `http://localhost:8000/api/v1/tests/cleanup/?testId=${testId}`;
  const res = await context.post(url);

  const status = res.status();
  const text = await res.text();

  // 👇 Affiche bien tout, et force les logs à apparaître
  console.log('--- Cleanup API response ---');
  console.log('URL:', url);
  console.log('Status code:', status);
  console.log('Response body:', text);
  console.log('-----------------------------');

  expect(res.ok()).toBeTruthy();
});

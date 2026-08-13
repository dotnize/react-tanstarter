import { createFileRoute } from "@tanstack/react-router";

import { IntroPage } from "#/components/_DELETE_ME_intro-page/intro-page";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  /**
   * Replace this component with your homepage or landing page,
   * then delete the `components/_DELETE_ME_intro-page/` folder.
   *
   * Happy coding!
   */
  return <IntroPage />;
}

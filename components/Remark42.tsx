window.remark_config = {
  host: "http://localhost:8080", // hostname of remark server, same as REMARK_URL in backend config, e.g. "https://demo.remark42.com"
  site_id: "asd",
  components: ["embed"], // optional param; which components to load. default to ["embed"]
  // to load all components define components as ['embed', 'last-comments', 'counter']
  // available component are:
  //     - 'embed': basic comments widget
  //     - 'last-comments': last comments widget, see `Last Comments` section below
  //     - 'counter': counter widget, see `Counter` section below
  locale: "es", // set up locale and language, if it isn't defined default value ('en') will be used
  show_email_subscription: false, // optional param; by default it is `true` and you can see email subscription feature
  // in interface when enable it from backend side
  // if you set this param in `false` you will get notifications email notifications as admin
  // but your users won't have interface for subscription
};

export default function Remark42(): JSX.Element {
  // return <script defer src="http://localhost:8080/web/embed.js" />;
  return null;
}

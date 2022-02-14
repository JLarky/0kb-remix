import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import { Partytown } from "@builder.io/partytown/react";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Partytown debug={true} />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <noscript id="_remix">
          <Scripts />
        </noscript>
        <script
          type="text/partytown"
          dangerouslySetInnerHTML={{
            __html: `
const start = async () => {
  const div = document.createElement("div"); div.innerHTML = document.querySelector('#_remix').firstChild.textContent;

  var s = div.firstChild;
  while (s) {
    s = s.nextSibling;
    if (s && s.nodeName === 'SCRIPT') {
      var t = document.createElement("script"); t.textContent = s.textContent; s.src && (t.src = s.src); t.type = s.type; t;
      document.getElementsByTagName('head')[0].appendChild(t);
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  console.log('finished!');
}
const x = document.createElement('div');
console.log('partytown!', x);
x.textContent = '🎉';
x.style.position = 'fixed';
x.style.bottom = '0';
x.style.right = '0';
document.getElementsByTagName('body')[0].appendChild(x);
start();
            `,
          }}
        />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

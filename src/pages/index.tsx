import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container landing-main">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Docusaurus Tutorial - 5min ⏱️
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      {/* <HomepageHeader /> */}
      <main className="hero">
      <div className="container landing-main">
        <h1 className="title">
          Unleash the Power of <strong>Haskell</strong> for All Your Devices
        </h1>
        <div>
        <p>
          Utilise Haskell to develop applications for <strong>iPhone</strong>, <strong>iPad</strong>, <strong>Android</strong>, and desktop operating
          systems including <strong>macOS</strong>, <strong>Windows</strong>, and <strong>Linux</strong>, as well as for Single Board Computers
          (SBCs) like the <strong>Raspberry Pi</strong>.
        </p>
        <p>
          Haskell's elegance and robustness are underscored by its <strong>strong
          type system</strong> and <strong>lazy functional programming</strong>
          approach, leading to fewer bugs and improved efficiency in your coding
          endeavours.
        </p>
        <p>
          Discover Haskell application development with resources for <strong>all
          levels</strong>, including <strong>beginner tutorials</strong> and <strong>in-depth guides</strong>, whether you're starting from scratch
          or porting an existing application.
        </p>
        <p>
          Ready to bring your cross-platform Haskell ideas to life?
        </p>
        </div>
        <div>
          <Link
            className="button button--primary"
            to="https://t.me/mobilehaskell">
            Join the Discussion
          </Link>
          <span> </span>
          <Link
            className="button button--secondary button--outline"
            to="/docs">
            Explore Documentaion
          </Link>
        </div>
      </div>
        {/* <HomepageFeatures /> */}
      </main>
    </Layout>
  );
}

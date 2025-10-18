// src/pages/bar.tsx
export const BarPage = () => (
  <>
    <header class="header">
      <div class="header__logo">
        <a href="/">
          <img src="/img/logo.png" alt="Showcase Hotel KASANE" />
        </a>
      </div>
      <div class="drawer-icon" id="js-drawer">
        <div class="drawer-icon-bars">
          <div class="drawer-icon-bar1" style={{ backgroundColor: 'rgb(35, 24, 21)' }}></div>
          <div class="drawer-icon-bar2" style={{ backgroundColor: 'rgb(35, 24, 21)' }}></div>
        </div>
      </div>

      <div class="drawer-bg">
        <div class="drawer-content">
          <div class="drawer__logo">
            <div class="drawer__logo--container">
              <img src="/img/drawer_logo.svg" alt="Showcase Hotel KASANE" />
            </div>
            <div class="drawer__reservation--container">
              <a
                href="https://www.hpdsp.net/kasane/hw/hwp3100/hww3101.do?yadNo=397390"
                target="_blank"
                rel="noopener noreferrer"
                class="drawer__reservation"
              >
                Reservation
              </a>
            </div>
          </div>
          <div class="drawer__links--container">
            <div class="drawer__links--wrap">
              <ul class="drawer__links">
                <li class="menu-item">
                  <a href="/">TOP</a>
                </li>
                <li class="menu-item">
                  <a href="/concept">Concept</a>
                </li>
                <li class="menu-item">
                  <a href="/room">Room</a>
                </li>
                <li class="menu-item current-menu-item">
                  <a href="/bar">Bar</a>
                </li>
                <li class="menu-item inactive">
                  <a href="/inside-garden">Inside garden</a>
                </li>
                <li class="menu-item">
                  <a href="/products">Products</a>
                </li>
              </ul>
            </div>
            <div class="drawer__links--wrap">
              <ul class="drawer__links">
                <li class="menu-item">
                  <a href="/news">News</a>
                </li>
                <li class="menu-item">
                  <a href="/#contact">Contact</a>
                </li>
                <li class="menu-item">
                  <a href="/parking">Parking</a>
                </li>
              </ul>
              <div class="drawer__details--container">
                <div class="drawer__details">
                  <p class="drawer__details--text">Showcase Hotel KASANE</p>
                  <p class="drawer__details--text -sm">〒695-0156 島根県江津市有福温泉町697</p>
                  <a href="tel:0855560011" class="drawer__details--tel">
                    TEL 0855-56-0011
                  </a>
                </div>
              </div>
            </div>
            <div class="drawer__links--wrap">
              <ul class="drawer__sns--links">
                <li class="drawer__sns--link">
                  <a
                    href="https://www.facebook.com/Showcase-Hotel-KASANE-101969295888716/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/img/icon_facebook-white.svg" alt="facebook" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="main">
      <div class="page__contents">
        <div class="inner__lg">
          <h1 class="section__title -center wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.5s">
            Bar
          </h1>
          <div class="page-mv wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.5s">
            <img src="/img/bar-fv.jpg" alt="Bar" />
          </div>
          <p class="p-lead -mv -sm wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.5s">
            島根の作り手が手掛ける味が集う空間
          </p>
          <p class="p-text wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.5s">
            島根の各地でつくられた、こだわりの食事とお酒を愉しむことができるBAR
            <br />
            木のバーカウンターと囲炉裏がある空間で過ごす、心地よい時間
          </p>
          <div class="bar__operation--container wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.5s">
            <p class="bar__operation__text">17:00-22:00(L.O.21:30)</p>
          </div>

          <ul class="s-column2__wrap bar__wrap">
            <li class="s-column2">
              <div class="s-column2__texts wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.5s">
                <h2 class="s-column2__lead">BREAKFAST</h2>
                <p class="s-column2__text">
                  地元のこだわり食材を使用した平飼いの卵やスモークベーコンの洋食セット朝食を、お部屋にてゆったりとお召し上がりいただけます。
                </p>
                <a href="" class="bar__link inactive">
                  <span>朝食メニュー</span>
                </a>
              </div>
              <div class="s-column2__img wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.5s">
                {/* <img src="" alt="" /> */}
              </div>
            </li>
            <li class="s-column2">
              <div class="s-column2__texts wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.5s">
                <h2 class="s-column2__lead">FOOD</h2>
                <p class="s-column2__text">
                  お酒に合うこだわりの酒肴を中心としたお食事を提供いたします。島根県各地の有名店の味をお楽しみください
                </p>
                <a href="" class="bar__link inactive">
                  <span>FOODメニュー</span>
                </a>
              </div>
              <div class="s-column2__img wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.5s">
                {/* <img src="" alt="" /> */}
              </div>
            </li>
            <li class="s-column2">
              <div class="s-column2__texts wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.5s">
                <h2 class="s-column2__lead">DRINK</h2>
                <p class="s-column2__text">
                  島根県産の銘酒やビールなど、地元の美味しいお酒を取り揃えました。心がほぐれる空間で、贅沢な時間をお過ごしください
                </p>
                <a href="" class="bar__link inactive">
                  <span>DRINKメニュー</span>
                </a>
              </div>
              <div class="s-column2__img wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.5s">
                <img src="/img/bar.jpg" alt="image" />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <section class="contact" id="contact">
        <div class="inner">
          <h2 class="section__title -center -light wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.5s">
            Contact
          </h2>
          <div class="contact__wrap">
            <div class="form wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.5s">
              <form action="/contact" method="post">
                <ul class="form__lists">
                  <li class="form__list">
                    <dl class="form__dl">
                      <dt>
                        <label htmlFor="yourName">お名前</label>
                      </dt>
                      <dd>
                        <input type="text" name="yourName" id="yourName" required />
                      </dd>
                    </dl>
                  </li>
                  <li class="form__list">
                    <dl class="form__dl">
                      <dt>
                        <label htmlFor="yourEmail">メール</label>
                      </dt>
                      <dd>
                        <input type="email" name="yourEmail" id="yourEmail" required />
                      </dd>
                    </dl>
                  </li>
                  <li class="form__list">
                    <dl class="form__dl">
                      <dt>
                        <label htmlFor="yourNumber">連絡先</label>
                      </dt>
                      <dd>
                        <input type="tel" name="yourNumber" id="yourNumber" />
                      </dd>
                    </dl>
                  </li>
                  <li class="form__list">
                    <dl class="form__dl">
                      <dt>
                        <label htmlFor="yourMessage">内容</label>
                      </dt>
                      <dd>
                        <textarea name="yourMessage" id="yourMessage" rows={10} required></textarea>
                      </dd>
                    </dl>
                  </li>
                </ul>
                <div class="form__check">
                  <label>
                    <input type="checkbox" name="check" value="1" required />
                    <span>
                      上記内容でよろしければ「チェック」をつけて
                      <span class="is-nowrap">送信ボタンを押してください</span>
                    </span>
                  </label>
                </div>
                <div class="form__submit">
                  <input type="submit" value="送信" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section class="map wow fadeInUp" data-wow-duration="2s" data-wow-delay="0.5s">
        <div class="map__wrap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3270.643226720486!2d132.19881181596287!3d34.940483680373724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x355a5db6fc4ea5f7%3A0x7560a06c412585f3!2sShowcase%20Hotel%20KASANE!5e0!3m2!1sja!2spa!4v1657788484180!5m2!1sja!2spa"
            style={{ border: 0 } as any}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="inner__md">
        <div class="f-container">
          <ul class="f-contents">
            <li class="f-content">
              <div class="f-logo">
                <a href="/">
                  <img src="/img/logo.png" alt="Showcase Hotel KASANE" />
                </a>
              </div>
            </li>
            <li class="f-content">
              <p class="f-text">Showcase Hotel KASANE</p>
              <p class="f-text -sm">〒695-0156 島根県江津市有福温泉町697</p>
              <p class="f-tel">
                <a href="tel:0855560011">TEL 0855-56-0011</a>
              </p>
            </li>
            <li class="f-content">
              <ul class="f-links">
                <li class="menu-item">
                  <a href="/">TOP</a>
                </li>
                <li class="menu-item">
                  <a href="/concept">Concept</a>
                </li>
                <li class="menu-item">
                  <a href="/room">Room</a>
                </li>
                <li class="menu-item current-menu-item">
                  <a href="/bar">Bar</a>
                </li>
                <li class="menu-item inactive">
                  <a href="/inside-garden">Inside garden</a>
                </li>
              </ul>
            </li>
            <li class="f-content">
              <ul class="f-links">
                <li class="menu-item">
                  <a href="/news">News</a>
                </li>
                <li class="menu-item">
                  <a href="/#contact">Contact</a>
                </li>
                <li class="menu-item">
                  <a href="/parking">Parking</a>
                </li>
              </ul>
              <ul class="f-sns__links">
                <li class="f-sns__link">
                  <a
                    href="https://www.facebook.com/Showcase-Hotel-KASANE-101969295888716/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src="/img/icon_facebook.svg" alt="facebook" />
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div class="copyright">
        <small>Showcase Hotel KASANE. ALL RIGHTS RESERVED.</small>
      </div>
    </footer>

    <div class="reservation-btn">
      <a
        href="https://www.hpdsp.net/kasane/hw/hwp3100/hww3101.do?yadNo=397390"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="btn__wrap">
          <span class="btn-lead">
            全国旅行支援
            <br class="is-sp" />
            参画宿
          </span>
          <span class="btn__reservation">
            <span class="en">Reservation</span>
            <span class="jp">ご予約はこちら</span>
          </span>
        </span>
      </a>
    </div>
  </>
)

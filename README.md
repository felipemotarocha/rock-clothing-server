# Rock Clothing (Server Side) 👕

---

> Simple E-commerce application built with React and GraphQL.

I built this application to practice my React and GraphQL skills. It's a pretty simple one so the data is static and can not be changed in the client side.

![Home Page](https://imgur.com/PdRiQqz.png)

![Collection Page](https://imgur.com/RADvw16.png)

![Cart Drawer](https://imgur.com/8Rd9G7f.png)

![Checkout Page](https://imgur.com/mcZKNO7.png)

![Login Page](https://imgur.com/h0EFjoW.png)

![Register Page](https://imgur.com/UAyVytM.png)

# Quick Start 🚀

---

Install the dependencies:

```bash
    yarn install
```

Create an `.env` file in the `root` directory with the following values:

```
DB_PASSWORD=Yw6ZxosIq3gsvkhp
JWT_SECRET_KEY=<your_jwt_secret_key>
STRIPE_SECRET_KEY=<your_stripe_secret_key>
```

## Setting Up Your Stripe Secret Key 🔑

---

> The Stripe API is used to process the payment of the products. A test credit card to actually do the payments is provided by Stripe.

To get a Stripe Secret Key you need to create an account [here](https://dashboard.stripe.com/register "Stripe Register Page").

After you create your account, yet in the Stripe website go to the `Dashboard` and expand the `Get your test API keys` section:

![Test API keys demo](https://imgur.com/OiHWW3J.png)
Then you can see your own Stripe Secret Key.

## Notes On The Database 📁

---

I provided the password of the `guest` user of the database, so you can only **read the data**. The database has all the necessary data that the application needs to work. Remember that is a simple e-commerce project so it does not have a functionality to edit the products. If you want to implement, you are free to do it.

# Client Side Code 💻

---

The client side code of this project is in [this repo](https://github.com/fmroocha/rock-clothing-client "Rock Clothing Client Side Repo").

# Application Info 📝

---

#### Author

Felipe Rocha [@dicasparadevs](https://instagram.com/dicasparadevs "dicasparadevs Instagram").

#### Version

1.0.0

#### License

This project is licensed under the MIT License.

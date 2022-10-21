# Welaundry (Client) - 우리동네 세탁소 포스

![Header](https://capsule-render.vercel.app/api?type=waving&color=216ba5&height=150&section=header)

<p align="center">
  <br>
  <img src="https://user-images.githubusercontent.com/79623316/175818637-4a2080fc-454c-4c37-97b0-81cba5cfa3ab.svg">
</p>

<p align="center">
  <br>
  Welaundry - laundry force application.
</p>

<p align="center">
  <img src="https://img.shields.io/github/package-json/v/hxxtae/we-laundry-client?color=%233fb911" alt="git-repository-versipn">
  <img src="https://img.shields.io/github/repo-size/hxxtae/we-laundry-client?color=%23&logo=github" alt="git-repo-size">
  <img src="https://img.shields.io/netlify/b8c06778-2b90-4fd3-a346-5060aba03482?logo=netlify" alt="netlify">
  <img src="https://img.shields.io/github/last-commit/hxxtae/we-laundry-client?color=%23e7e7e7&logo=github" alt="git-last-commit">
  <img src="https://img.shields.io/github/license/hxxtae/we-laundry-client?color=%23097aba&logo=github" alt="git-license">
</p>

<br>

<p align="center">
  <a href="https://hxxtae.github.io/we-laundry-desc/" target="_blank">
    <img src="https://img.shields.io/badge/homepage-white?style=for-the-badge&logo=googlechrome&color=%23097aba&logoColor=ffffff">
  </a>
  <a href="https://welaundry.netlify.app/" target="_blank">
    <img src="https://img.shields.io/badge/APPLICATION-white?style=for-the-badge&logo=googlechrome&color=000000&logoColor=ffffff">
  </a>
  <a href="https://welaundry-collections.netlify.app/" target="_blank">
    <img src="https://img.shields.io/badge/MANAGER-white?style=for-the-badge&logo=googlechrome&color=3BD671&logoColor=ffffff">
  </a>
  <br>
</p>

<br>

## Description

### 프로젝트 개요/동기

**1. 무엇을 위한 프로그램?**   
- 대중적인 포스 시스템은 일반 음식점이나, 카페, 의류매장에서 많이 사용하지만, 세탁소 업종에서는   
포스 시스템이 많지 않거나, 수기로 장부를 사용하기 때문에 이를 개선하고자 프로젝트를 기획하게 되었습니다.

<br>

**2. 어떤 문제를 해결할 수 있나요?**   
- 우리동네 세탁소에서는 하루, 일주일에 수백가지 옷 개수와 종류가 세탁소에 맡겨집니다.   
하나하나 장부 책자를 넘겨가면서 찾을 필요 없이 전자 장부처럼 활용 할 수 있으며, 더 나아가 날짜별, 고객별 등    
데이터를 손쉽게 조회하고, 나의 매출, 손님 리스트, 품목 관리 등을 활용하여 매출 상승의 효과를 가져올 수 있습니다.

<br>

**3. 어떤 사람들이 이 프로그램을 사용하면 좋은가요?**   
- 큰 기업의 세탁소가 아닌 일반 세탁소(소상공인)를 대상으로 합니다.

<br>

## Index

- [Stack](#stack)
- [RESTful Api](#restful-api)
- [State Management](#state-management)
- [Auth Confirm](#auth-confirm)
- [Theme](#theme)
- [Router](#router)
- [Page](#page)
  1. [로그인 & 회원가입](#page-1-login-signup)
  2. [메인화면](#page-2-메인화면)
  3. [주소관리](#page-3-주소관리)
  4. [고객관리](#page-4-고객관리)
  5. [품목관리](#page-5-품목관리)
  6. [주문접수](#page-6-주문접수)
  7. [주문조회](#page-7-주문조회)
  8. [매출관리-(진행중)](#page-8-매출관리--진행중)
- [License](#license)

<br>

## Stack

### Client

| TypeScript | React    | Recoil    | React-Query    | styled-components    | framer-motion    |
| :--------: | :------: | :-------: | :------------: | :------------------: | :--------------: |
|   ![ts]    | ![react] | ![recoil] | ![react-query] | ![styled-components] | ![framer-motion] |

<br>

### Server

| JavaScript | Express    | MongoDB    | Jwt    |
| :--------: | :--------: | :--------: | :----: |
|   ![js]    | ![express] | ![MongoDB] | ![Jwt] |

<br>

## RESTful Api

### **auth**
```
GET /auth/me         - Authentication check
GET /auth/csrf-token - Csrf attack security
POST /auth/signup    - User sign up
POST /auth/login     - User login
POST /auth/logout    - User logout
```

### **customer**
```
GET /customer?addname&dong&ho    - Find customers by its address name, dong, ho
POST /customer                   - Create a new customer
PUT /customer/:id                - Update an existing customer by its ID
DELETE /customer/:id             - Delete an existing customer by its ID
```

### **address**
```
GET /address        - Get list of address
GET /address/:id    - Find a address by its ID
POST /address       - Create a new address
PUT /address/:id    - Update an existing address by its ID
DELETE /address/:id - Delete an existing address by its ID
```

### **products**
```
GET /products            - Get list of products, category
POST /products           - Create a new category
POST /products/list      - Create a new product
PUT /products/:id        - Update an existing category list by its ID
PUT /products/list/:id   - Update an existing product list by its ID
DELETE /products/:id     - Delete an existing category by its ID
```

### **records**
```
GET /records?addname&dong&ho    - Find records by customer's address name, dong, ho
GET /records/:recordDate        - Find records by its Date
POST /records                   - Create a new record
DELETE /records/:id             - Delete an existing record by its ID
```

### **sale**
```
GET /sale  - Get list of sales
POST /sale - Create a new sale
```

<br>

## Auth Confirm

<p align="center">
  <img src="https://user-images.githubusercontent.com/79623316/184595947-9717c689-8d63-4397-8200-984bfa8f0545.PNG" style="width: 800px" >
</p>

```js
import jwt from 'jsonwebtoken';

import * as AuthRepository from '../data/auth.js';
import { config } from '../config.js'

const AUTH_ERROR = { message: '로그인이 필요한 서비스입니다.' }; // Authorization Error

export const isAuth = async (req, res, next) => {
  let token;
  
  if (!token) {
    token = req.cookies['token'];
  }
  if (!token) {
    return res.status(401).json(AUTH_ERROR);
  }

  // JWT(Json Web Token)
  jwt.verify(
    token,
    config.jwt.secretKey,
    async (error, decoded) => {
      if (error) {
        return res.status(401).json(AUTH_ERROR);
      }
      const user = await AuthRepository.findById(decoded.id);
      if (!user) {
        return res.status(401).json(AUTH_ERROR);
      }
      
      req.userId = user.id;
      req.token = token;
      req.userName = user.username;
      next();
    }
  )
}
```

<br>

## State Management

<p align="center">
  <img src="https://user-images.githubusercontent.com/79623316/184597533-a16a7ec1-5181-42d6-9bce-f9c822ee4810.svg" style="width: 500px">
</p>


```ts
export const userState = atom<string | undefined>({
  key: 'user',
  default: undefined,
});

export const useAuthFetch = (): IAuthFetch => {
  const [user, setUser] = useRecoilState(userState);
  const authService = useRecoilValue(authApi);

  const { isLoading } = useQuery(queryKeys.auth.me(), () => authService.me(), {
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      setUser(data?.data.username);
    },
  }); 

  return { user, isLoading }
}
```
```tsx
const AuthContext = ({ children }: IAuthContextProps) => {  
  const { user, isLoading } = useAuthFetch();

  return (
    <>
      {
        isLoading ? <LoginLoading /> :
        user ? children : <NonUserRouter />
      }
    </>
  )
}
export default AuthContext;
```

<br>

## Theme

<p align="center">
  <img src="https://user-images.githubusercontent.com/79623316/184602416-63477d3f-a7a9-467d-86ed-498f8cad1aca.png">
</p>

```ts
const localTheme = themeStorage.get();

export const themeState = atom<boolean>({
  key: 'theme',
  default: !!localTheme,
});
```

```tsx
import { ThemeProvider } from 'styled-components';

const App = () => {
  const theme = useRecoilValue(themeState);
  const thisTheme = theme ? darkTheme : lightTheme;
  
  return (
    <ThemeProvider theme={{ ...thisTheme }}>
      ...
      <ThemeButton />
    </ThemeProvider>
  );
}
export default App;
```

```tsx
const ThemeButton = () => {
  const [theme, setTheme] = useRecoilState(themeState);
  const onClick = () => {
    setTheme((prev) => {
      if (prev) {
        themeStorage.remove();
        return !prev;
      }
      themeStorage.set();
      return !prev;
    });
  }

  return (  
    <ToggleButton type='button' onClick={onClick}>
      ...
    </ToggleButton>
  )
}
export default ThemeButton;
```

| Dark Theme   | Light Theme   |
| :----------: | :-----------: |
| ![darkTheme] | ![lightTheme] |

<br>

## Router

<br>

## Page

### page 1 (로그인, 회원가입)
![login](https://user-images.githubusercontent.com/79623316/175766234-eadafa94-ad69-4780-a052-c2dea289ba21.PNG)
![signup](https://user-images.githubusercontent.com/79623316/175767125-584dcdb1-2359-487f-a947-53ba72270830.PNG)

<br>

### page 2 (메인화면)
![main](https://user-images.githubusercontent.com/79623316/175766846-8e868b5c-db6a-43a5-ae9c-bab8339c3b8e.PNG)

<br>

### page 3 (주소관리)
![address](https://user-images.githubusercontent.com/79623316/175766955-51daf465-d0b5-40ee-8acc-388e9afa55a6.PNG)
![address_addfullname](https://user-images.githubusercontent.com/79623316/175766961-93c4b8a5-9719-43c4-8f1c-0cb4763988f6.PNG)

<br>

### page 4 (고객관리)
![customer](https://user-images.githubusercontent.com/79623316/175766940-bd6e2760-0d35-415f-960a-efb7a0e9d81b.PNG)

<br>

### page 5 (품목관리)
![products](https://user-images.githubusercontent.com/79623316/175766950-f16f9e95-6370-4df9-b63f-4aab44f0937f.PNG)

<br>

### page 6 (주문접수)
![record](https://user-images.githubusercontent.com/79623316/175766868-c6217ba4-f049-468e-8e4b-6b3cdf0a8b5f.PNG)
![record_receipt](https://user-images.githubusercontent.com/79623316/175766892-0caa73bf-5ae0-46ab-a9b5-aac05f8a09dd.PNG)
![record_success](https://user-images.githubusercontent.com/79623316/175766907-d400950f-09a7-46cd-9228-d5854c56f1e9.PNG)

<br>

### page 7 (주문조회)
![history](https://user-images.githubusercontent.com/79623316/175766922-260c2047-8eeb-4056-87a2-dfacf2cfa6c0.PNG)

<br>

### page 8 (매출관리 : 진행중)
![sale](https://user-images.githubusercontent.com/79623316/183927294-6867463a-c8c8-476d-b0dc-8cd446128075.PNG)

<br>

## License

This project is licensed under the MIT License.

![license](https://img.shields.io/github/license/hxxtae/we-laundry-client?color=%23097aba&logo=github&style=for-the-badge)


<br>

![footer](https://capsule-render.vercel.app/api?type=waving&color=216ba5&height=150&section=footer)

<!-- Stack Icon References -->
<!-- client -->
[ts]: https://user-images.githubusercontent.com/79623316/175767679-b759c752-d9f9-49d2-a503-276e30292442.svg
[react]: https://user-images.githubusercontent.com/79623316/175767657-f4926c0c-0c8e-4f4d-957e-c4c4877ffe16.svg
[recoil]: https://user-images.githubusercontent.com/79623316/175767881-e60e3519-242d-49f6-80c7-ac8b40470e2f.svg
[react-query]: https://user-images.githubusercontent.com/79623316/175767768-3740450e-cb18-4b23-b2f9-174edcdb87a5.svg
[styled-components]: https://user-images.githubusercontent.com/79623316/175817624-3a749264-9f78-4e14-a385-cf4561a80dcb.svg
[framer-motion]: https://user-images.githubusercontent.com/79623316/175818241-8c03852c-3335-4fcf-80d8-e12045dae3c0.png

<!-- server -->
[js]: https://user-images.githubusercontent.com/79623316/175768623-70eebdf4-b364-4169-887a-897e9b7e79ff.svg
[express]: https://user-images.githubusercontent.com/79623316/175768610-87b88173-79d2-4eb9-a6ff-c2f861fecca5.svg
[mongodb]: https://user-images.githubusercontent.com/79623316/175768561-f3886ba4-d0d2-4bb1-b1a1-ba64422415b8.svg
[jwt]: https://user-images.githubusercontent.com/79623316/175768540-b71c1cce-2f8d-4406-a8b9-de70d756a5be.svg

<!-- Theme Icon References -->
[darkTheme]: https://user-images.githubusercontent.com/79623316/184606050-84cbe6c3-5be8-4e55-8064-980ad0839733.PNG
[lightTheme]: https://user-images.githubusercontent.com/79623316/184606246-3deadf0d-57b1-422b-ac41-25bc88d4010e.PNG







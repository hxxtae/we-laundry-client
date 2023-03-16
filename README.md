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

**1. 프로젝트 소개**
- 세탁소에서 사용되는 포스를 바탕으로 제작한 `세탁소 전용 포스 웹 애플리케이션` 입니다.
- 이전 SSR 방식의 <a href="https://hxxtae.github.io/we-laundry-asis/" target="_blank"><U>믿음세탁</U></a> 포스 웹 애플리케이션을 바탕으로 새롭게 개발되었습니다.

<br>

**2. 프로젝트 기획 의도**   
- 대중적인 포스 시스템은 일반 음식점이나, 카페, 의류매장에서 많이 사용하지만, 세탁소 업종에서는   
포스 시스템이 많지 않거나, 수기로 장부를 사용하기 때문에 이를 개선하고자 프로젝트를 기획하게 되었습니다.

<br>

**3. 어떤 문제를 해결할 수 있나요?**   
- 동네 세탁소의 아날로그 방식의 단점을 보완할 수 있습니다.   
수기 장부로 관리되어지는 데이터를 온라인에서 편리하게 데이터를 관리할 수 있습니다.

- 세탁소 포스기는 세탁소에서 사용되는 전용 포스 시스템입니다.    
이 시스템은 고객들의 주문을 처리하고, 결제를 처리하며, 세탁 과정을 관리하는 데 필요한 기능을 제공합니다.

- 세탁소 포스기는 세탁소의 업무를 효율적으로 처리하는 데 필요한 기능을 모두 제공합니다.    
이는 세탁소의 업무 처리 속도를 높이고, 고객들의 만족도를 높이는 데 큰 도움이 됩니다.

- 고객 맞춤 및 매출 향상에 기여할 수 있습니다.   
날짜별, 고객별 등 데이터를 손쉽게 조회하고, 나의 매출, 고객 목록, 품목 관리 등을 통해 고객의 니즈를 분석할 수 있습니다.

<br>

**4. 어떤 사람들이 이 애플리케이션을 사용하면 좋은가요?**   
- 일반 동네 세탁소(소상공인)를 대상으로 합니다.

<br>

**5. 주요 기능**
- 인증 기능
```
  회원가입 및 로그인을 통한 인증 및 각 사용자별 고유 포스 환경 제공.
```

- 관리기능
```
1. 고객 정보 관리 기능(리스트별로 조회하거나 추가, 수정, 삭제)
2. 주소 정보 관리 기능(리스트별로 조회하거나 추가, 수정, 삭제)
3. 세탁 품목 정보 관리 기능(카테고리별로 조회하거나 카테고리 및 품목 추가, 수정, 삭제)
```

- 접수기능
```
1. 등록된 고객 정보를 기반으로 세탁 품목 주문 접수 및 주문 조회할 수 있습니다.
2. 접수된 주문 데이터를 기반으로 누적 판매 품목 및 가격을 table과 Graph로 시각적인 데이터를 제공합니다.
```

<br>

**6. 앞으로 방향**   
- 차기 Develop으로 카드 단말기를 통한 결제 시스템을 구현할 예정입니다.   
동시에 어떻게 기술을 적용하고, 어떤 기술을 사용하며, 왜 사용하는지 에 대한 고민을 계속해서 이어나갈 것입니다.

<br>

## Index

- [Stack](#stack)
- [RESTful Api](#restful-api)
- [Authorization](#authorization)
- [State Management](#state-management)
- [Theme](#theme)
- [Router](#router)
- [Page](#page)
  1. [로그인 page](#1-로그인-페이지login-page)
  2. [회원가입 page](#2-회원가입-패이지signup-page)
  3. [포스 메인 page](#3-포스-메인-페이지posonandoff-page)
  4. [주소 관리 page](#4-주소-관리-페이지address-page)
  5. [고객 관리 page](#5-고객-관리-페이지customer-page)
  6. [품목 관리 page](#6-품목-관리-페이지products-page)
  7. [주문 접수 page](#7-주문-접수-페이지records-page)
  8. [주문 조회 page](#8-주문-조회-페이지history-page)
  9. [매출 관리 page](#9-매출-관리-페이지sales-page)
- [Deploy](#deploy)
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

## Authorization

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
### 왜 인증 절차가 필요한가?

- 각 세탁소별 포스기를 이용하는 사자님들의 맞춤형 데이터를 제공하고 
고객, 품목, 주소, 매출 등 각 게게별 고유한 정보를 처리하기 위해서 입니다.

<br>

### 코드 설명과 이유

1. CORS 작동방식 중 `Credentialed Request` 방식을 사용하여 브라우저 요청 헤더에 쿠키를 포함하여 서버단에서 `JWT` 토큰을 검증하는 코드입니다.
2. `JWT(JSON Web Token)` 은(는) JSON 포맷을 이용하여 사용자에 대한 속성을 저장하는 Claim 기반의 WebToken입니다.
3. `토큰-기반-인증` 시스템은 인증 받은 사용자들에게 토큰을 발급하고, 서버에 요청할 때마다 `토큰(JWT)`에 보관된 사용자 인증 정보를 검증하기 때문에, `서버-기반-인증` 방식 처럼 세션ID 토큰을 검증하기 위해 서버의 리소스를 많이 소모할 필요가 없습니다.

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
### 코드 설명과 이유

1. 위 코드는 사용자 인증 성공 여부에 따른 라우터된 화면을 보여줍니다.
2. `Server(React-Query)`에서 응답한 사용자의 정보를 받아 `Client(Recoil)`의 전역 상태로 관리되어 집니다.
3. Server상태와 Client상태를 나누어 관리하기 때문에 프로젝트의 규모가 커질 수록 관리되는 상태의 복잡성을 낮출 수 있는 장점이 존재합니다. (상태 값에 따른 구독 컴포넌트의 명확성 향상)

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
<p align="center">
  <img src="https://user-images.githubusercontent.com/79623316/203274607-945e1ac7-e953-4796-b1c3-5cb932713aec.jpg" alt="welaundry Router Flow">
</p>

### Before Login (NonUserRouter)

| Path         | Property  | Description                                  |
| ------------ | --------- |--------------------------------------------- |
| **/**        | _[exact]_ | Root path is Login page                      |
| **/signup**  | _[exact]_ | This router path is signup page              |
| **\***       |           | This router path is connection by login page |

<br>

### After Login (UserRouter)

| Path            | Property  | Description                               |
| --------------- | --------- | ----------------------------------------- |
| **/**           | _[exact]_ | POS Context router                        |
| **/pos**        |           | POS Context router                        |
| **/board**      |           | Board Context router                      |
| **\***          |           | This router path is page not found        |

<br>

### After Login (UserPosRouter)

| Path              | Property  | Description                               |
| ----------------- | --------- | ----------------------------------------- |
| **/**             | _[exact]_ | Root path is pos on & off page            |
| **/pos**          | _[exact]_ | This router path is pos on & off page     |
| **/pos/records**  | _[exact]_ | This router path is order receiption page |
| **/pos/history**  | _[exact]_ | This router path is order list page       |
| **/pos/customer** | _[exact]_ | This router path is customer manage page  |
| **/pos/products** | _[exact]_ | This router path is products manage page  |
| **/pos/address**  | _[exact]_ | This router path is address manage page   |
| **/pos/sales**    | _[exact]_ | This router path is sales manage page     |
| **\***            |           | This router path is page not found        |

<br>

## Page

### 1. 로그인 페이지(login page)
![login](https://user-images.githubusercontent.com/79623316/206898784-c25a53b4-d0a8-4406-bf8d-240d10203c1d.jpg)

<br>

### 2. 회원가입 패이지(signup page)

![signup](https://user-images.githubusercontent.com/79623316/175767125-584dcdb1-2359-487f-a947-53ba72270830.PNG)

<br>

### 3. 포스 메인 페이지(posOnAndOff page)
![main](https://user-images.githubusercontent.com/79623316/175766846-8e868b5c-db6a-43a5-ae9c-bab8339c3b8e.PNG)

<br>

### 4. 주소 관리 페이지(address page)
![address](https://user-images.githubusercontent.com/79623316/175766955-51daf465-d0b5-40ee-8acc-388e9afa55a6.PNG)
![address_addfullname](https://user-images.githubusercontent.com/79623316/175766961-93c4b8a5-9719-43c4-8f1c-0cb4763988f6.PNG)

<br>

### 5. 고객 관리 페이지(customer page)
![customer](https://user-images.githubusercontent.com/79623316/175766940-bd6e2760-0d35-415f-960a-efb7a0e9d81b.PNG)

<br>

### 6. 품목 관리 페이지(products page)
![products](https://user-images.githubusercontent.com/79623316/206899279-219ee357-4254-48ad-bcc0-2ea0a19ceb47.jpg)

<br>

### 7. 주문 접수 페이지(records page)
![record_1](https://user-images.githubusercontent.com/79623316/206899363-9c25ff51-d244-41e8-a0c1-fc9f65a0c1ed.jpg)
![record_2](https://user-images.githubusercontent.com/79623316/206899365-8d71201a-5634-43d9-934b-22eaa1748d26.jpg)
![record_3](https://user-images.githubusercontent.com/79623316/206899366-93517063-5e7e-459c-b9bd-2ef9b48bfcb0.jpg)

<br>

### 8. 주문 조회 페이지(history page)
![history](https://user-images.githubusercontent.com/79623316/206899402-9067f884-a0ea-477b-8a07-3a889d09d77b.jpg)

<br>

### 9. 매출 관리 페이지(sales page)
![sales](https://user-images.githubusercontent.com/79623316/206899421-a161063f-7a97-4eab-9662-4e993a840cb9.jpg)

<br>

## Deploy

| Client (netlify) | Server (koyeb) |
| :--------------: | :------------: |
| ![netlify]       | ![koyeb]       |


<br>

## License

This project is licensed under the APACHE-2.0 License.

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

<!-- Deploy Icon -->
[netlify]: https://user-images.githubusercontent.com/79623316/206897886-4a18e242-5282-4d5b-a0cc-795b645f6132.svg
[koyeb]: https://user-images.githubusercontent.com/79623316/206897918-e801bc16-da50-4b46-9251-0dd951f32d5f.svg




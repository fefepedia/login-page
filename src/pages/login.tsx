import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { authTokenVar } from "../apollo";
import { ErrorMessage } from "../components/error-message";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";

interface ILoginForm {
  email: string;
  password: string;
}

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;

export const LoginPage: React.FC = () => {
  const {
    register,
    errors: formError,
    handleSubmit,
    getValues,
  } = useForm<ILoginForm>();

  const onCompleted = ({ login: { token } }: loginMutation) => {
    if (token) {
      authTokenVar(token);
    }
  };
  const [
    loginMutation,
    { loading, error: loginMutationError, data: loginMutationResult },
  ] = useMutation<loginMutation, loginMutationVariables>(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="pg_login h-screen flex justify-center items-center">
      <div className="pg_login_inner flex flex-col justify-center items-center w-full max-w-screen-sm bg-gray-100 pt-8 pb-5 py-7 rounded-xl">
        <h2 className=" text-3xl text-gray-800">LOG IN</h2>
        <form
          action="/"
          method="post"
          onSubmit={handleSubmit(onSubmit)}
          className="w-full"
        >
          <div className="form_wrapper flex flex-col items-center mt-7 px-5 py-3">
            <input
              ref={register({
                required: "This is required",
                pattern: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
              })}
              type="text"
              name="email"
              required
              placeholder="Email"
              className="core-input w-full mb-3 px-3 py-3 rounded-md text-lg"
            />
            {formError.email?.message && (
              <ErrorMessage
                message={formError.email.message}
                className="mb-3"
              />
            )}
            {formError.email?.type === "pattern" && (
              <ErrorMessage message="it needs email rules" className="mb-3" />
            )}
            <input
              ref={register({
                required: "This is required",
              })}
              type="password"
              name="password"
              required
              placeholder="Password"
              className="core-input w-full mb-3 px-3 py-3 rounded-md text-lg"
            />
            {formError.password?.message && (
              <ErrorMessage message={formError.password.message} />
            )}
            {loginMutationResult?.login.error && (
              <ErrorMessage message={loginMutationResult?.login.error} />
            )}
            {loginMutationError?.message && (
              <ErrorMessage message={loginMutationError.message} />
            )}
            <button
              type="submit"
              className="btn_submit w-full mt-4 py-3 bg-blue-400 rounded-md text-white text-xl"
            >
              {loading ? "Loading..." : "LogIn"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

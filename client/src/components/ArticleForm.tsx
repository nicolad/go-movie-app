import React from 'react'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

const FormTitle = styled.h1`
  margin: 0 0 40px;
  font-size: 22px;
  color: #333;
`
const FormGroup = styled.div`
  margin: 30px 0;
`
const Label = styled.label`
  display: block;
  margin: 0 0 10px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`
const TitleInput = styled.input.attrs({ type: 'text' })`
  width: 100%;
  margin: 0 0 10px;
  padding: 15px;
  font-size: 16px;
  color: #333;
  border: solid 1px #ccc;
  border-radius: 3px;
`
const BodyTextarea = styled.textarea`
  appearance: none;
  resize: none;
  width: 100%;
  height: 200px;
  line-height: 1.6;
  margin: 0 0 10px;
  padding: 15px;
  font-size: 16px;
  color: #333;
  border: solid 1px #ccc;
  border-radius: 3px;
`
const ErrorMessage = styled.p`
  margin: 0;
  font-size: 16px;
  color: orange;
`
const SubmitButton = styled.button`
  appearance: none;
  cursor: pointer;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  outline: none;
  background: #eee;
  color: #333;
  font-size: 16px;
`

export interface ArticleFormData {
  title: string
  body: string
}

export interface ArticleFormProps {
  title: string
  defaultValues?: ArticleFormData
  onSubmit: (data: ArticleFormData) => void
}

const ArticleForm: React.FC<ArticleFormProps> = ({
  title,
  defaultValues,
  onSubmit,
}: ArticleFormProps) => {
  const { register, handleSubmit, errors } = useForm<ArticleFormData>({
    defaultValues,
  })

  return (
    <div>
      <FormTitle>{title}</FormTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <TitleInput
            name="title"
            ref={register({ required: true, maxLength: 20 })}
          />
          <ErrorMessage>
            {errors.title && 'Article title should be from 1 to 20 characters.'}
          </ErrorMessage>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="title">Body</Label>
          <BodyTextarea name="body" ref={register({ required: true })} />
          <ErrorMessage>
            {errors.body && 'Article body is required.'}
          </ErrorMessage>
        </FormGroup>
        <SubmitButton>Save</SubmitButton>
      </form>
    </div>
  )
}
export default ArticleForm

# Importing necessary libraries from transformers and sklearn, along with sys for command line arguments
from transformers import DataCollatorWithPadding, Trainer, TrainingArguments, BertTokenizer, BertConfig, BertForSequenceClassification, pipeline
from sklearn.metrics import accuracy_score, f1_score
import sys

# Function to compute metrics for model evaluation
def compute_metrics(pred):
    labels = pred.label_ids
    preds = pred.predictions.argmax(-1)
    f1 = f1_score(labels, preds, average='weighted')
    acc = accuracy_score(labels, preds)
    return {'accuracy': acc, 'f1': f1}

# Preparing the BERT model configuration
model_ckpt = 'bert-base-uncased'
label2id = {"sadness": 0, "joy": 1, "love": 2, "anger": 3, "fear": 4, "surprise": 5}
id2label = {"0": "sadness", "1": "joy", "2": "love", "3": "anger", "4": "fear", "5": "surprise"}
config = BertConfig.from_pretrained(model_ckpt, label2id=label2id, id2label=id2label)

# Initializing the tokenizer
tokenizer = BertTokenizer.from_pretrained(model_ckpt)

# Data collator for padding input data
data_collator = DataCollatorWithPadding(tokenizer=tokenizer)

# Pre-trained model name and loading the model
trained_model_name = "bhadresh-savani/bert-base-uncased-emotion"
pre_trained_model = BertForSequenceClassification.from_pretrained(trained_model_name, config=config)

# Setting up training arguments for evaluation
training_args = TrainingArguments(
    output_dir='./emotions_predictions',
    per_device_eval_batch_size=64,
)

# Creating a trainer for the pre-trained model
pre_trainer = Trainer(
    model=pre_trained_model,
    args=training_args,
    data_collator=data_collator,
    compute_metrics=compute_metrics,
)

# Setting up a pipeline for text classification
classifier = pipeline("text-classification", model='RicoCHEH/output', top_k=None)

# Reading input data (lyrics) from command line arguments
lyrics = sys.argv[1:]
totals, average = dict.fromkeys(label2id.keys(), 0), dict.fromkeys(label2id.keys(), 0)
count = 0

for line in lyrics:
    prediction = classifier(line)
    count += 1

    for category in prediction[0]:
        totals[category['label']] += category['score']

    for k in totals.keys():
        average[k] = totals[k] / count

    print(average)